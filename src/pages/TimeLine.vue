<template>
    <div>
        <div class="buttons">
            <el-button type="primary"  @click="batchOptions">批量操作</el-button>
            <el-button type="primary"  @click="batchDel">删除照片</el-button>
        </div>
        <el-container class="container" id="img_card">
            <el-row>
                <el-col  :span="6" v-for=" (pic , index)  in url_id " :offset="0" :key="index">
                    <el-card :body-style="{padding: '0.5px'}"
                             :class="chosenState[index]?  'card_chosen': 'card'">
                        <img :src="pic.url"  class="humbnail_photo"  @click="chooseCondition(index, pic.id)">
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
                    <el-button type="primary" @click="removePhoto(id_detail)"> Remove</el-button>
                </div>
            </el-dialog>
        </el-container>
    </div>
</template>

<script>
    import axios from '../axios'
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
                batchState:false,           //是否点击批量操作：true false
                chosenState:[],             //图片选中状态数组：true false
                options_list:[],            //选中图片id的数组：["id1","id2"...]
            }
        },
        created() {
            this.getAll(0);
        },
        mounted(){
            window.addEventListener('scroll', this.windowScroll);
        },
        methods: {
            //点击图片，根据条件选择执行事件
            chooseCondition(index,id){
                if(this.batchState){
                    this.isChosen(index, id);
                }
                else {
                    this.details(id)
                }
            },

            //单图片详情
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
                        _this.getThumbnailPhoto(_this.photo_id_all[i]);
                        _this.chosenState.push(false);
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
                    if(this.current_page < (this.total_pages-1) ){
                        console.log(this.current_page + ' '  + this.photo_all.totalPages);
                        this.current_page = this.current_page + 1;
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
                        let value2 = b['time'];
                        return value1 - value2;
                    });
                }).catch(function (error) {
                    console.log(error);
                });
            },

            //更改batchState状态
            batchOptions(){
                this.batchState = true;
            },

            //判断图片是否选中，选中即将图片id加入数组options_list，否则从数组查找去重
            isChosen(index,id){
                let _this = this;
                if (!this.chosenState[index]) {
                    this.chosenState.splice(index,1,true);
                    this.options_list.push(id);
                }
                else {
                    this.chosenState.splice(index,1,false);
                    for(let i = 0 ; i< _this.options_list.length ; i++){
                        if(id === _this.options_list[i]){
                            _this.options_list.splice(i,1);
                        }
                    }
                }
            },

            //批量删除，循环调用deletePhoto方法
            batchDel(){
                for(let i=0; i<this.options_list.length; i++){
                    let _this = this;
                    this.$store.dispatch('DeletePhoto',this.options_list[i]).then( res =>{
                        _this.chosenState.splice(i,1,false);
                        window.location.href = "/";
                    }).catch(error =>{
                        console.log(error);
                    })
                }
            },

            //根据id删除图片
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
    .card{
        width: 304px;
        height: 250px;
        margin-right: 400px;
        margin-bottom: 25px;
        border-width: 4px;
    }
    .container{
        padding-top: 59px;
    }
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
</style>
