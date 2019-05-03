<template xmlns:el-col="http://www.w3.org/1999/html">
    <el-container id="container">
        <el-row>
            <el-checkbox-group v-model="checked_list" >
            <el-col  :span="6" v-for=" (pic , index)  in url_id " :offset="0" :key="index">
                <el-checkbox :label="pic.id">
                   <el-card :body-style="{padding: '0.5px'}" >
                       <img :src="pic.url"  class="humbnail_photo"  @click="details(pic.id)">
                   </el-card>
                </el-checkbox>
            </el-col>
            </el-checkbox-group>
        </el-row>

        <el-dialog :visible.sync="dialogPhotoVisible"
                   center
                   width="70%"
                   >
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
                <el-button type="primary" @click="removePhoto(id_detail)"> Remove</el-button>
            </div>
        </el-dialog>
    </el-container>


</template>

<script>
    import axios from '@/axios'
    export default {
        components:{

        },
        name: "TimeLine",
        data(){
            return{
                photo_all:[],
                photo_id_all:[],
                url_id:[],
                current_page:'',
                total_pages:'',
                url_detail:'',
                id_detail:'',
                dialogPhotoVisible:false,
                bok_show:false,
                checked_list:[],
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
                this.id_detail = id;
                this.url_detail = '';
                this.dialogPhotoVisible = true;
                this.getPhoto(id);
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
                    _this.photo_id_all = _this.photo_all.content.map(a => {
                        return{
                            id : a.id,
                            time : new Date(a.create ? a.create : a.upload),
                            type : a.type,
                        }
                    });
                    /*
                    此处去重
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

                    if(this.current_page < this.total_pages ){
                        this.current_page = this.current_page + 1;
                        console.log(this.current_page + ' '  + this.photo_all.totalPages);
                        this.getAll(this.current_page);
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
                     _this.url_detail = url;
                }).catch(function (error) {
                    console.log(error);
                });
            },

            getThumbnailPhoto(photo) {
                let _this = this;
                let _photo = photo;
                axios({
                    method: 'get',
                    url: 'http://photo.upc.pub/photo/get_thumbnail_photo/' + _photo.id,
                    headers: {
                        "authorization": "Bearer " + window.localStorage.getItem('Authorization'),
                    },
                    responseType: 'blob',
                }).then(function (res) {
                    let url = URL.createObjectURL(res.data);
                    _this.url_id.push({'url':url, 'id':_photo.id, 'time':_photo.time, 'type': _photo.type});
                    _this.url_id.sort(function (a, b) {
                        let value1 = a['time'];
                        //console.log(a.time);
                        let value2 = b['time'];
                        return value1 - value2;
                    });
                }).catch(function (error) {
                    console.log(error);
                });
            },

        //this function was used by dialog
            // but, Delete in vuex has code and test fully.
        deletePhoto(id){
            let _this = this;
            this.$store.dispatch('DeletePhoto',id).then( res =>{
                alert('删除成功');
                //查找删除
                for(let i=0; i < _this.url_id.length ; i++ ){
                    if(id === _this.url_id[i].id){
                        _this.url_id.splice(i,1);
                        break;
                    }
                }
                //关闭dialog
                _this.dialogPhotoVisible=false;
            }).catch(error =>{
                console.log(error);
            })

            },
        removePhoto(id){

        },

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
        height: 350px;
    }
    .dialog{
    }
</style>
