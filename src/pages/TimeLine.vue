<template>
    <div>
        <div class="buttons">
            <el-button type="primary"  @click="batchOptions">批量操作</el-button>
            <el-button type="primary"  @click="batchDel">删除照片</el-button>
            <el-button type="primary"  @click="batchHide">隐藏照片</el-button>
            <el-button type="primary" @click="dialogFormVisible = true">分享照片</el-button>
            <el-dialog title="分享照片" :visible.sync="dialogFormVisible" center :modal="false">
                <el-form :model="form">
                    <el-form-item label="分享密码" :label-width="formLabelWidth">
                        <el-input v-model="form.password" placeholder="请设置分享密码" class="share_input"></el-input>
                    </el-form-item>
                    <el-form-item label="分享有效期" :label-width="formLabelWidth">
                        <el-select v-model="form.expiration" placeholder="请选择分享有效期">
                            <el-option label="3天期限" value="259200"></el-option>
                            <el-option label="7天期限" value="604800"></el-option>
                            <el-option label="永久期限" value="-1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="batchShare">确 定</el-button>
                </div>
            </el-dialog>


            <el-dropdown class="drop">
                <el-button type="primary">
                    移动照片<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for=" (album, index) in getAlbum"
                                      @click.native="batchMove(album)"
                                      :key="index">
                        {{album.name}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div v-for="(date, key) in photo_date" class="timeline_card" :key="key" >
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
        <details-dialog></details-dialog>
    </div>
</template>

<script>
    import DetailsDialog from "@/components/DetailsDialog"
    import axios from '@/axios'
    export default {
        name: "TimeLine",
        components: {
            DetailsDialog
        },
        data(){
            return{
                //中间商
                photo_id_all:[],
                //页码信息
                current_page:'',
                total_pages:'',
                //批量操作
                batchState:false,
                //图片选中状态 布尔数组
                chosenState:[],
                //选中图片id的数组
                options_list:[],
                photo_date:[],
                show_url_id:[],
                dialogFormVisible: false,
                form: {
                    password: '',
                    expiration: '',
                },
                formLabelWidth: '250px',
                share_id:'',
                base_password:'',
            }
        },
        created() {
            this.getAll(0);
            this.$store.dispatch('GetAlbumInfo').then(function (res) {
                console.log(window.location.href);

            }).catch(function (error) {
                console.log(error);
            });
        },
        mounted(){
            window.addEventListener('scroll', this.windowScroll);
        },
        methods: {
            //点击图片，根据条件选择执行事件
            chooseCondition(index, pic){
                if(this.batchState){
                    this.isChosen(index, pic.id);
                }
                else {
                    this.details(pic)
                }
            },

            details(pic){
                console.log(pic);
                this.$store.dispatch('RiseDetailsDialog', pic);
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
                            type : a.type ? a.type : [],
                            album: a.album ? a.album : {name: ''},
                            address : a.address ? a.address :{
                                country:'',
                                city:'',
                                province:'',
                                district:'' },
                            faces: a.faces ? a.faces : {},
                        }
                    });

                    for(let i = 0; i< _this.photo_id_all.length; i++){
                        _this.chosenState.push(false);
                        if(_this.photo_date.indexOf(_this.photo_id_all[i].date) === -1){
                            _this.photo_date.unshift(_this.photo_id_all[i].date);
                        }
                    }

                    _this.photo_date.sort(function (a, b) {
                        let _b = parseInt(b.replace(/-/g,""));
                        let _a = parseInt(a.replace(/-/g,""));

                        return _b - _a;
                    });

                    /*
                    此处去重 重复原因 ： 在滑块向下滑动的过程中会产生多次事件触发，
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
                        //console.log(this.current_page + ' '  + this.total_pages);
                        this.getAll(this.current_page);
                    }
                }
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
            //批量删除
            batchDel(){
                let faultNum = 0;
                if( !this.options_list.length )  alert("请先选择照片!");
                else{
                    for(let i=0; i<this.options_list.length; i++) {
                        this.$store.dispatch('DeletePhoto',this.options_list[i]).then( res =>{
                            this.chosenState.pop();
                            this.options_list.splice(i,1);
                        }).catch(error =>{
                            faultNum ++;
                            console.log(error);
                        })
                    }
                    for (let i=0; i<this.chosenState.length; i++){
                        if(this.chosenState[i])
                            this.chosenState.splice(i,1,false);
                    }
                    if(!faultNum) alert("删除成功");
                    else alert(faultNum +"张图片删除失败");
                }
            },
            //批量隐藏
            batchHide(){
                if(window.localStorage.getItem('securityToken')) {
                    if(this.options_list.length === 0) {
                        alert("请先选择照片!")
                    }
                    else{
                        for(let i=0; i<this.options_list.length; i++) {
                            axios({
                                method: 'post',
                                url: 'http://photo.upc.pub/photo/change_to_security',
                                headers: {
                                    'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                                },
                                params: {'photoId':this.options_list[i], 'securityToken':window.localStorage.getItem('securityToken')},
                            }).then(res => {
                                console.log(res);
                            }).catch(error => {
                                console.log(error);
                            })
                        }
                        for (let i=0; i<this.chosenState.length; i++){
                            if(this.chosenState[i])
                                this.chosenState.splice(i,1,false);
                        }
                        alert("隐藏成功");
                    }
                }
                else{
                    alert("暂未开启隐私空间，请前往设置");
                    router.push('./sex');
                }
            },

            //批量移动
            batchMove(album){
                if(this.options_list.length === 0) {
                    alert("请先选择照片!")
                }
                else{
                    let faultNum=0;
                    for(let i=0; i<this.options_list.length; i++) {
                        console.log(album);
                        console.log(this.options_list[i]);
                        this.$store.dispatch('MoveToAlbum',
                            {photoId:this.options_list[i], album : album}).then( res =>{
                        }).catch(error =>{
                            faultNum++;
                            console.log(error);
                        })
                    }
                    for (let i=0; i<this.chosenState.length; i++){
                        if(this.chosenState[i]) {
                            this.chosenState.splice(i, 1, false);
                        }
                    }
                    if(!faultNum) alert("移动成功");
                    else alert(faultNum+"张图片移动失败");
                    this.batchState = !this.batchState;
                    this.options_list = [];
                }
            },

            //批量分享
            batchShare(){
                if(this.options_list.length === 0) {
                    alert("请先选择照片!");
                    this.dialogFormVisible = false;
                }
                else{
                    let faultNum = 0;
                    this.$store.dispatch('SharePhoto', {'list':this.options_list,'password':this.form.password,'expiration':this.form.expiration}).then(res => {
                        this.share_id = res.data.id;
                        alert("分享链接:" + window.location.href + "share/" + this.share_id +"\n分享密码:" + this.base_password);
                    }).catch(error => {
                        faultNum++;
                        console.log(error);
                    });
                    for (let i=0; i<this.chosenState.length; i++){
                        if(this.chosenState[i]) {
                            this.chosenState.splice(i, 1, false);
                        }
                    }
                    if(!faultNum) alert("已添加到分享列表");
                    else alert(faultNum+"张图片添加分享列表失败");
                    this.batchState = !this.batchState;
                    this.options_list = [];
                    this.dialogFormVisible = false;
                    this.base_password = this.form.password;
                    this.form.password = '';
                    this.form.expiration = '';
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

        destroyed () {
            window.removeEventListener('scroll', this.windowScroll);
        }
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
    .share_input{
        width: 220px;
    }
</style>

