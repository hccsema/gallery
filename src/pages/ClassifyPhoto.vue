<template>
    <div>
        <div class="buttons">
            <el-button type="primary"  @click="batchOptions">批量操作</el-button>
            <el-button type="primary"  @click="batchDel">删除照片</el-button>
        </div>
        <el-container class="container">
            <el-row>
                <el-col :span="6" v-for=" (pic , index)  in type_photos " :offset="0" :key="index">
                    <el-card :body-style="{padding: '0.5px'}"
                             :class="chosenState[index]?  'card_chosen': 'card'">
                        <img :src="pic.url"  class="humbnail_photo" @click="chooseCondition(index, pic.id)">
                    </el-card>
                </el-col>
            </el-row>

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
        </el-container>
    </div>
</template>

<script>
    import axios from '../axios'
    export default {
        name: "ClassityPhoto",
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
                params:{typeName: this.get_Type_Name}
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
                // let _this = this;
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
            get_Type_Name(){
                return this.$store.getters.get_Type_Name;
            }
        },
    }
</script>

<style scoped>
    .humbnail_photo{
        width: 100%;
        height: 250px;
    }
    .detail_photo{
        padding: 30px 0;
        height: 350px;
    }
    .dialog{
    }
    .card{
        width: 304px;
        height: 250px;
        margin-right: 400px;
        margin-bottom: 25px;
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
        width: 304px;
        height: 250px;
        margin-right: 400px;
        margin-bottom: 25px;
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
    .container{
        padding-top: 60px;
    }
</style>
