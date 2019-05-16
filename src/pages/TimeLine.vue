<template>
    <div>
        <div class="buttons">
            <el-button type="primary"  @click="batchOptions">批量操作</el-button>
            <el-button type="primary"  @click="batchDel">删除照片</el-button>
        </div>

            <div v-for="(date, key) in photo_date" class="timeline_card" :key="key">
                <h1 class="pic_date">{{date}}</h1>
             <br><br>

                <el-row>
                    <el-col  :span="6" v-for=" (pic , index)  in getUrlId " :offset="0" :key="index">
                        <el-card v-if="date === pic.date"
                                 :body-style="{padding: '0.5px'}"
                                 :class="chosenState[index]?  'card_chosen': 'card'">
                            <img :src="pic.url"  class="humbnail_photo"  @click="chooseCondition(index, pic)">
                        </el-card>
                    </el-col>
                </el-row>



             </div>

        <transition name="el-fade-in">
            <div class="page-up" v-show="btnFlag" @click="backTop">
                <i class="el-icon-caret-top"></i>
            </div>
        </transition>

    <el-dialog :visible.sync="dialogPhotoVisible" center width="70%">
        <div class="dialog">
            <el-row>
                <el-col :span="16">
                    <img :src="url_detail" class="detail_photo" >
                </el-col>
                <el-col :span="8" >
                    <br>
                    <h3>图片中可能包含:</h3>
                    <el-button  v-for="(type, index) in pic_detail.type" :key="index"
                                round
                               type="primary"
                               size="small"
                               @click="enterType(type)">
                        {{type}}
                    </el-button>

                    <br>
                    <h3>相册:</h3>
                    <p v-if="!pic_detail.album">该图片暂不归属于任一相册</p>
                    <el-button round
                               type="primary"
                               v-if="pic_detail.album"
                               size="small"
                               @click="enterAlbum(pic_detail.album)">
                        {{pic_detail.album}}
                    </el-button>

                    <h3>地点:</h3>
                    <p v-if="pic_detail.address.country === '' ">该图片未含有位置信息</p>
                    <el-button round
                               type="info"
                               v-if="!(pic_detail.address.country === '')"
                               size="small"
                               @click="enterType(pic_detail.type)">
                        {{pic_detail.address.country}}
                        {{pic_detail.address.province}}
                        {{pic_detail.address.city}}
                        {{pic_detail.address.district}}
                    </el-button>

                    <br>
                </el-col>
            </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deletePhoto(pic_detail.id)">Delete</el-button>
            <el-button type="primary" @click="movePhoto(pic_detail.id)">Remove</el-button>
        </div>
    </el-dialog>



    </div>
</template>

<script>
    import ScrollTop from "@/components/ScrollTop";
    import router from "@/router";

    export default {
        name: "TimeLine",
        components: {ScrollTop},
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
                pic_detail:{address:{
                        country:'',
                        city:'',
                        province:'',
                        district:''


                    }},
                dialogPhotoVisible:false,
                //批量操作
                batchState:false,
                //图片选中状态 布尔数组
                chosenState:[],
                //选中图片id的数组
                options_list:[],

                photo_date:[],
                show_url_id:[],
                btnFlag : false,
            }
        },
        created() {
            this.getAll(0);
        },
        mounted(){
            window.addEventListener('scroll', this.windowScroll);
            window.addEventListener('scroll', this.scrollToTop);
        },
        methods: {

            backTop () {
                let that = this;
                let timer = setInterval(() => {
                    let ispeed = Math.floor(-that.scrollTop / 5);
                    document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed;
                    if (that.scrollTop === 0) {
                        clearInterval(timer);
                    }
                }, 16)
            },

            // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
            scrollToTop () {
                let that = this;
                that.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                that.btnFlag = that.scrollTop > 60;
            },

            //点击图片，根据条件选择执行事件
            chooseCondition(index, pic){
                if(this.batchState){
                    this.isChosen(index, pic.id);
                }
                else {
                    this.details(pic)
                }
            },



            enterType(type){
                router.push({name:'ClassifyPhoto', params:{type:type}});
            },

            //单图片详情
            details(pic){
                /*
                此处完成单图片详情的展示
                */

                this.pic_detail = pic;
                this.url_detail = '';
                this.dialogPhotoVisible = true;
                this.getPhoto(pic.id);
                //console.log(this.url_detail);
            },

            getAll(page, number=20){
                let _this = this;
                this.$store.dispatch('GetAll',page,number).then(res =>{
                    let data = res.data;
                    console.log(data);
                    _this.current_page = data.page;
                    _this.total_pages = data.totalPages;
                    _this.photo_id_all = data.content.map(a => {
                        return{
                            id : a.id,
                            time : new Date(a.create ? a.create : a.upload),
                            date : _this.GMTToStr(new Date(a.create ?  a.create : a.upload)).slice(0,10),
                            type : a.type,
                            album: a.album,
                            address : a.address,
                        }
                    });

                    for(let i = 0; i< _this.photo_id_all.length; i++){
                        _this.chosenState.push(false);
                        if(_this.photo_date.indexOf(_this.photo_id_all[i].date) === -1){
                            _this.photo_date.unshift(_this.photo_id_all[i].date);
                        }
                    }
                    _this.photo_date.sort(function (a, b) {
                        return b - a;
                    });

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
                        console.log(this.current_page + ' '  + this.total_pages);
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
            window.removeEventListener('scroll', this.windowScroll);
            window.removeEventListener('scroll', this.scrollToTop);

        }



    }
</script>

<style scoped lang="scss">
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

    .page-up{
        background-color: #409eff;
        position: fixed;
        right: 50px;
        bottom: 30px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        cursor: pointer;
        transition: .3s;
        box-shadow: 0 3px 6px rgba(0, 0, 0, .5);
        opacity: .5;
        z-index: 100;
        .el-icon-caret-top{
            color: #fff;
            display: block;
            line-height: 40px;
            text-align: center;
            font-size: 18px;
        }
        p{
            display: none;
            text-align: center;
            color: #fff;
        }
        &:hover{
            opacity: 1;
        }
    }

</style>

