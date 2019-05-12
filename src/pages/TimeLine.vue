<template>
    <div>
        <div class="buttons">
            <el-button type="primary"  @click="batchOptions">批量操作</el-button>
            <el-button type="primary"  @click="batchDel">删除照片</el-button>
        </div>
        <div v-for="(date, key) in photo_date" class="timeline_card" :key="key">
            <h1 class="pic_date">{{date}}</h1>
            <br><br>
            <el-container >
                <el-row>
                    <el-col  :span="6" v-for=" (pic , index)  in getUrlId " :offset="0" :key="index">
                        <el-card v-if="date === pic.date"
                                 :body-style="{padding: '0.5px'}"
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
                        <el-button type="primary" @click="movePhoto(id_detail)"> Remove</el-button>
                    </div>
                </el-dialog>
            </el-container>
        </div>
    </div>
</template>

<script>
    export default {
        components:{
        },
        name: "TimeLine",
        data(){
            return{

                //被删除的属性如下：
                // 1. url_id:[], 已经完整封装在state中，可通过getUrlId（见computed）直接获取，
                //         使用： 行数 9
                // 2. photo_all:[], 被简约
                //当前页面中间全局量
                photo_id_all:[],
                //页码信息
                current_page:'',
                total_pages:'',
                //图片详情信息
                url_detail:'',
                id_detail:'',

                dialogPhotoVisible:false,
                //批量操作
                batchState:false,
                //图片选中状态 布尔数组
                chosenState:[],
                //选中图片id的数组
                options_list:[],

                photo_date:[],
                show_url_id:[],
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
            chooseCondition(index,  id){
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
                this.$store.dispatch('GetAll',page,number).then(function (res) {
                    let data = res.data;
                    _this.current_page = data.page;
                    _this.total_pages = data.totalPages;
                    _this.photo_id_all = data.content.map(a => {
                        return{
                            id : a.id,
                            time : new Date(a.create ? a.create : a.upload),
                            date : _this.GMTToStr(new Date(a.create ?  a.create : a.upload)).slice(0,10),
                            type : a.type,
                        }
                    });

                    for(let i = 0; i< _this.photo_id_all.length; i++){
                        _this.chosenState.push(false);
                        if(_this.photo_date.indexOf(_this.photo_id_all[i].date) === -1){
                            _this.photo_date.push(_this.photo_id_all[i].date);
                        }
                    }
                    _this.photo_date.sort();
                    /*
                    此处去重
                    重复原因 ： 在滑块向下滑动的过程中会产生多次事件触发，
                                可能产生多次请求，暂时无较优解
                                （若直接设置最底部触发，则触发条件变得苛刻，体验变差
                                    ，同时加载过程中，依然会触发)
                     */
                    for(let i = 0; i< _this.photo_id_all.length; i++){
                        if(!(_this.getUrlId.some(function (x) {
                            return _this.photo_id_all[i].id === x.id;
                        })))
                        {
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
                if (current <= 0.01 ) {

                    if(this.current_page < this.total_pages ){
                        this.current_page = this.current_page + 1;
                        // console.log(this.current_page + ' '  + this.total_pages);
                        this.getAll(this.current_page);
                    }
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

            getThumbnailPhoto(photo) {
                this.$store.dispatch('GetThumbnailPhoto',photo).then(function (res) {

                }).catch(function (error) {
                    console.log(error);
                });
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

            //this function was used by dialog only，
            // but, Delete in vuex has code and test fully.
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


            batchOptions(){
                this.batchState = !this.batchState;
                this.options_list = [];
                for (let i=0; i<this.chosenState.length; i++){
                    if(this.chosenState[i])
                        this.chosenState.splice(i,1,false);
                }
            },

            /**
             * @return {string}
             */
            GMTToStr(time){
                let date = new Date(time);
                return date.getFullYear() + '-' +
                    this.appendZero((date.getMonth() + 1)) + '-' +
                    this.appendZero(date.getDate());
            },
            /**
             * @return {string}
             */
            appendZero(obj){
                if(obj<10) return "0"+ obj;
                else return obj;
            },

            //移动图片至隐藏空间
            movePhoto(id){

            },


        },

        computed:{
            getUrlId(){
                return this.$store.getters.getUrlId;
            }

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
</style>

