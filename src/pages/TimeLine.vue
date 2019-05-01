<template xmlns:el-col="http://www.w3.org/1999/html">
    <div>
        <div class="buttons">
            <el-button type="primary" @click="batchoptions">批量操作</el-button>
            <el-button type="primary" @click="del">删除照片</el-button>
        </div>
        <el-container class="container">
            <el-row>
                <el-col  :span="4" v-for=" (pic , index)  in url_id " :offset="1" :key="index">
                    <el-card :body-style="{padding: '0.5px'}" class="card">
                        <img :src="pic.url"  class="humbnail_photo"  @click="details(pic.id)">
                    </el-card>
                </el-col>
            </el-row>
            <el-dialog :visible.sync="dialogPhotoVisible">
                <div class="dialog">
                    <el-row>
                        <el-col :span="20">
                            <img :src="url_details[0]" class="detail_photo">
                        </el-col>
                        <el-col :span="4" >
                            <el-button> delete</el-button>
                            <el-button> remove</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-dialog>
        </el-container>
    </div>
</template>

<script>
    import axios from '../axios'
    export default {
        name: "TimeLine",
        data(){
            return{
                photo_all:[],
                photo_id_all:[],
                url_id:[],
                current_page:'',
                total_pages:'',
                url_details :[],
                dialogPhotoVisible:false,
                batchState:false,
            }
        },
        created() {
            this.getAll(0);
        },
        mounted(){
            window.addEventListener('scroll', this.windowScroll);
        },
        methods: {

            details(id){
                /*
                此处完成单图片详情的展示
                */
                if(this.batchState === true){
                    return;
                }
                this.url_details.pop();
                this.getPhoto(id);
                this.dialogPhotoVisible = true;

            },

            getAll(page, number=20){
                let _this = this;
                axios({
                    method:'get',
                    url: 'http://photo.upc.pub/photo/get_all/' + page +'/' + number,
                    headers:{
                        "authorization" : "Bearer " + window.localStorage.getItem('Authorization'),
                    }
                }).then(function (res) {
                    _this.photo_all = res.data;
                    _this.current_page = _this.photo_all.page;
                    _this.total_pages = _this.photo_all.totalPages;
                    _this.photo_id_all = _this.photo_all.content.map( a => a.id);
                    /*
                    此处硬核去重
                    重复原因 ： 在滑块向下滑动的过程中会产生多次事件触发，
                                可能产生多次请求，暂时无较优解
                                （若直接设置最底部触发，则触发条件变得苛刻，体验变差
                                    ，同时加载过程中，依然会触发)
                     */
                    for(let i = 0; i< _this.photo_id_all.length; i++){
                        if(!_this.url_id.some(function (x) {
                            return _this.photo_id_all[i] === x.id
                        })) {
                            _this.getThumbnailPhoto(_this.photo_id_all[i]);
                        }
                        // if(_this.photo_date.indexOf(res.data.content[i]['modify'].slice(0,10),0) === -1){
                        //     _this.photo_date.push(res.data.content[i]['modify'].slice(0,10));
                        //     _this.photo_date.sort();
                        // }
                    }
                }).catch(function (error){
                    console.log(error);
                });
            },


            windowScroll(){
                //滚动条距离页面顶部的距离
                let scrollTop = document.documentElement.scrollTop; //可滑动高
                let scrollHeight = document.documentElement.scrollHeight; //全高
                let clientHeight = document.documentElement.clientHeight; //页高
                let current = (scrollHeight - clientHeight - scrollTop) / clientHeight;
                if (current <= 0.05 ) {

                    console.log(this.photo_all.page + '  '  + this.photo_all.totalPages);

                    if(this.current_page < (this.total_pages-1) ){
                        this.current_page +=1;
                        this.getAll(this.current_page );

                    }
                }
            },

            getPhoto(id) {
                let _id = id;
                let _this = this;
                axios({
                    method: 'get',
                    url: 'http://photo.upc.pub/photo/get_photo/' + _id,
                    headers: {
                        "authorization": "Bearer " + window.localStorage.getItem('Authorization'),
                    },
                    responseType: 'blob',
                }).then(function (res) {
                    let url = URL.createObjectURL(res.data);
                    _this.url_details.pop();
                    _this.url_details.push(url);
                }).catch(function (error) {
                    console.log(error);
                });
            },

            getThumbnailPhoto(id) {
                let _this = this;
                let _id = id;
                axios({
                    method: 'get',
                    url: 'http://photo.upc.pub/photo/get_thumbnail_photo/' + _id,
                    headers: {
                        "authorization": "Bearer " + window.localStorage.getItem('Authorization'),
                    },
                    responseType: 'blob',
                }).then(function (res) {
                    let url = URL.createObjectURL(res.data);
                    _this.url_id.push({'url':url,'id':_id});
                }).catch(function (error) {
                    console.log(error);
                });
            },
            batchoptions() {
                this.batchState = !this.batchState;

            }



        },

        computed:{

        },
        watch:{

        },
        destroyed () {
            window.removeEventListener('scroll', this.windowScroll)
        }



    }
</script>

<style scoped>
    .humbnail_photo{
        width: 100%;
        height: 250px;
    }
    .detail_photo{
        padding: 30px 0;
        height: 500px;
    }
    .dialog{
        padding-left: -30px;
    }
    .buttons{
        position: absolute;
        margin-left: 73px;
    }
    .card{
        width: 100%;
        height: 250px;
        margin-left: 17px;
        margin-right: 400px;
        margin-bottom: 25px;
    }
    .container{
        padding-top: 60px;
    }
</style>
