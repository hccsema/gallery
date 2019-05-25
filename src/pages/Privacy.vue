<template>
    <div>
        <h1>Private Space</h1>
        <div class="buttons">
            <el-button type="primary"  @click="batchOptions" >批量操作</el-button>
            <el-button type="primary"  @click="batchDel">删除照片</el-button>
        </div>
        <br><br><br>
        <div class="container-card">
            <el-row >
                <el-col :span="6" v-for=" (pic, index)  in type_photos " :offset="0" :key="index">
                    <el-card :body-style="{padding: '0.5px'}"
                             :class="chosenState[index]?  'card_chosen': 'card'">
                        <img :src="pic.url"  @click="chooseCondition(index, pic)">
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <!--     隐藏变移出   -->
        <details-dialog></details-dialog>
    </div>
</template>

<script>
    import axios from '../axios'
    import DetailsDialog from '@/components/DetailsDialog'
    export default {
        name: "Privacy",
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
        components:{
          DetailsDialog
        },
        created() {
            axios({
                method: 'get',
                url:'http://photo.upc.pub/photo/get_security',
                headers:{
                    'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                },
                params:{'securityToken': window.localStorage.getItem('securityToken')}
            }).then(res =>{
                // console.log(res);
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
            details(pic){
                this.$store.dispatch('RiseDetailsDialog', pic)
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
        },
        computed:{
            getUrlId(){
                return this.$store.getters.getUrlId;
            },
            getAlbum(){
                return this.$store.getters.getAlbum;
            },
        },
    }
</script>

<style scoped lang="scss">
    .humbnail_photo{
        width: 100%;
        height: 250px;
    }
    .card{
        margin-bottom: 25px;
        border-width: 4px;
    }
    .buttons{
        position: absolute;
        margin-left: 3px;
        z-index: 999;
    }
    .card_chosen{
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

    .el-dropdown {
        vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .drop{
        margin-left: 10px;
    }
</style>
