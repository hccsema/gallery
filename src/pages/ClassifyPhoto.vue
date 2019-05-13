<template>
    <container>
        <h1>{{$route.params.type}}</h1>
<!--        <el-button type="primary" icon="el-icon-s-order" circle @click="batchOptions"></el-button>-->
<!--        <el-button type="danger" icon="el-icon-delete" circle @click="batchDel"></el-button>-->
        <div class="buttons">
            <el-button type="primary"  @click="batchOptions" >批量操作</el-button>
            <el-button type="primary"  @click="batchDel">删除照片</el-button>
        </div>
        <br>

        <el-dialog :visible.sync="dialogPhotoVisible" center width="70%">
            <div class="dialog">
                <el-row>
                    <el-col :span="20">
                        <img :src="url_detail" class="detail_photo">
                    </el-col>
                    <el-col :span="4" >
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deletePhoto(id_detail)">Delete</el-button>
                <el-button type="primary" @click="movePhoto(id_detail)"> Remove</el-button>
            </div>
        </el-dialog>
        <div class="container-card">
                <el-row >
                    <el-col :span="6" v-for=" (pic, index)  in type_photos " :offset="0" :key="index">
                        <el-card :body-style="{padding: '0.5px'}"
                             :class="chosenState[index]?  'card_chosen': 'card'"><img :src="pic.url"  @click="chooseCondition(index, pic.id)">
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </container>
</template>

<script>
    import axios from '../axios'
    export default {
        name: "ClassifyPhoto",
        data(){
            return{
                type_photos:[],
                art_id:[],
                url_detail:'',
                id_detail:'',
                dialogPhotoVisible:false,
                batchState:false,
                //图片选中状态 布尔数组
                chosenState:[],
                //选中图片id的数组
                options_list:[],
            }
        },
        created() {
            axios({
                method: 'get',
                url:'http://photo.upc.pub/photo/get_type_photos',
                headers:{
                    'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                },
                params:{typeName: this.$route.params.type}
            }).then(res =>{
                let _this = this;
                for(let i=0; i < res.data.content.length; i++){
                    _this.art_id.push(res.data.content[i]['id']);
                    axios({
                        method: 'get',
                        url: 'http://photo.upc.pub/photo/get_thumbnail_photo/' + _this.art_id[i],
                        headers: {
                            "authorization": "Bearer " + window.localStorage.getItem('Authorization'),
                        },
                        responseType: 'blob',
                    }).then(res => {
                        let url = URL.createObjectURL(res.data);
                        _this.type_photos.push({'id':_this.art_id[i],'url':url,'size':res.data.size});
                        _this.type_photos.sort(function (a, b) {
                            return a.size - b.size;
                        });
                    }).catch(error => {
                        console.log(error);
                    });
                }
            }).catch(error =>{
                console.log(error);
            });
        },
        methods:{
            chooseCondition(index,  id){
                if(this.batchState){
                    this.isChosen(index, id);
                }
                else {
                    this.details(id)
                }
            },
            details(id){
                /*
                此处完成单图片详情的展示
                */
                this.id_detail = id;
                this.url_detail = '';
                this.dialogPhotoVisible = true;
                this.getPhoto(id);
            },
            isChosen(index,id){
                if (!this.chosenState[index]) {
                    this.chosenState.splice(index,1,true);
                    this.options_list.push(id);
                }
                else {
                    this.chosenState.splice(index,1,false);
                    for(let i = 0 ; i< this.options_list.length ; i++){
                        if(id === this.options_list[i]){
                            this.options_list.splice(i,1);
                            break;
                        }
                    }
                }
            },
            batchOptions(){
                this.batchState = !this.batchState;
                this.options_list = [];
                for (let i=0; i<this.chosenState.length; i++){
                    if(this.chosenState[i])
                        this.chosenState.splice(i,1,false);
                }
            },
            getPhoto(id) {
                let _this = this;
                this.$store.dispatch('GetPhoto',id).then(function (res) {
                    _this.url_detail = URL.createObjectURL(res.data);
                }).catch(function (error) {
                    console.log(error);
                });
            },
            //批量删除，循环调用DeletePhoto action
            batchDel(){

                if(this.options_list.length === 0) {
                    alert("请先选择照片!")
                }
                else{
                    for(let i=0; i<this.options_list.length; i++) {
                        this.$store.dispatch('DeletePhoto',this.options_list[i]).then( res =>{
                            this.chosenState.pop();
                            for(let i=0; i < this.type_photos.length ; i++ ){
                                if(this.options_list[i] === this.type_photos[i].id){
                                    this.type_photos.splice(i,1);
                                    break;
                                }
                            }
                            this.options_list.splice(i,1);
                        }).catch(error =>{
                            alert("删除失败");
                            console.log(error);
                        })
                    }
                    for (let i=0; i<this.chosenState.length; i++){
                        if(this.chosenState[i])
                            this.chosenState.splice(i,1,false);
                    }
                    alert("删除成功");
                }
            },
            deletePhoto(id){
                let _this = this;
                this.$store.dispatch('DeletePhoto',id).then( res =>{
                    alert('删除成功');
                    //关闭dialog
                    _this.dialogPhotoVisible=false;
                }).catch(error =>{
                    alert('删除失败');
                    console.log(error);
                })

            },
            movePhoto(id){

            },
        },
        computed:{

        },
    }
</script>

<style scoped>
    .mmp{
     width: 100%;
    }
    .humbnail_photo{
    }
    .detail_photo{
        padding: 30px 0;
        height: 350px;
    }
    .dialog{
    }
    .card{
        border-width: 4px;
    }
    /*.container{*/
    /*    padding-top: 59px;*/
    /*}*/
    .buttons{
        position: absolute;
        margin-left: 3px;
        z-index: 999;
    }
    .card_chosen{
        border-width: 4px;
        border-color: #1da2ff;

    }
    .timeline_card{
        padding-top: 80px;
    }
    .pic_date{
        position: absolute;
        margin-left: 4px;
    }
    .container-card{
        margin-top: 30px;
    }
</style>
