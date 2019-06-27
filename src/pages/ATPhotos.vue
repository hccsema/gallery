<template>
    <div>
        <h1>
            {{$route.params.name}}
            {{$route.params.id}}
        </h1>
        <div class="buttons">
            <el-button type="primary"  @click="batchOptions" >批量操作</el-button>
            <el-button type="primary"  @click="batchDel">删除照片</el-button>
        </div>
        <br><br><br>
        <div class="container-card">
            <el-row  v-if="$route.params.id === ''">
                <el-col :span="6" v-for=" (pic, index)  in getUrlId " :offset="0" :key="index">
                    <div v-for="(type, index2) in pic.type" :key="index2">
                        <el-card v-if="type === $route.params.name"
                                 :body-style="{padding: '0.5px'}"
                                 :class="chosenState[index]?  'card_chosen': 'card'">
                            <img :src="pic.url"
                                 class="thumbnail_photo"
                                 @click="chooseCondition(index, pic)">
                        </el-card>
                    </div>
                </el-col>
            </el-row>

            <el-row  v-if="$route.params.lol === '' ">
                <el-col :span="6" v-for=" (pic, index)  in getUrlId " :offset="0" :key="index">
                    <el-card v-if="pic.address.city === $route.params.name"
                             :body-style="{padding: '0.5px'}"
                             :class="chosenState[index]?  'card_chosen': 'card'">
                        <img :src="pic.url"
                             class="thumbnail_photo"
                             @click="chooseCondition(index, pic)">
                    </el-card>
                </el-col>
            </el-row>

            <el-row  v-else>
                <el-col :span="6" v-for=" (pic, index)  in getUrlId " :offset="0" :key="index">
                    <el-card v-if="pic.album.name === $route.params.name"
                             :body-style="{padding: '0.5px'}"
                             :class="chosenState[index]?  'card_chosen': 'card'">
                        <img :src="pic.url"
                             class="humbnail_photo"
                             @click="chooseCondition(index, pic)">
                    </el-card>
                </el-col>
            </el-row>

        </div>
        <DetailsDialog></DetailsDialog>
    </div>
</template>

<script>
    import axios from "@/axios"
    import DetailsDialog from '@/components/DetailsDialog'
    export default {
        name: "ATPhotos",
        components:{
            DetailsDialog,
        },
        data(){
            return{
                photo_id_all:[],
                batchState:false,
                //图片选中状态 布尔数组
                chosenState:[],
                //选中图片id的数组
                options_list:[],
                current_page:'',
                total_pages:'',

            }
        },
        created() {
            if(this.$route.params.id === ''){
                console.log(this.$route.params.name);
                this.getAllByType(this.$route.params.name);
            }
            else if(this.$route.params.lol === '') {
                console.log(this.$route.params.name);
                this.getAllByCity(this.$route.params.name);
            }
            else {
                this.getAllByAlbum(this.$route.params.id);
            }

        },
        methods:{
            getAllByAlbum(id){
                let _this = this;
                let obj = {id : id, page : 0, number : 20};
                this.$store.dispatch("GetAllByAlbum", obj).then(res =>{
                    let data = res.data;
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
                    }

                    for(let i = 0; i< this.photo_id_all.length ; i++){
                        if(!(_this.getUrlId.some(function (x) {
                            return _this.photo_id_all[i].id === x.id;
                        })))
                        {
                            _this.getThumbnailPhoto(_this.photo_id_all[i]);
                        }
                    }

                }).catch(error =>{
                    console.log(error);
                });
            },
            getAllByType(name){
                console.log(name);
                axios({
                    method: 'get',
                    url:'http://photo.upc.pub/photo/get_type_photos',
                    headers:{
                        'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                    },
                    params:{typeName: name}
                }).then(res =>{
                    let _this = this;
                    let data = res.data;
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
                    }

                    for(let i = 0; i< this.photo_id_all.length ; i++){
                        if(!(_this.getUrlId.some(function (x) {
                            return _this.photo_id_all[i].id === x.id;
                        })))
                        {
                            _this.getThumbnailPhoto(_this.photo_id_all[i]);
                        }
                    }
                }).catch(error =>{
                    console.log(error);
                });
            },

            getAllByCity(name){
                console.log(name);
                axios({
                    method: 'get',
                    url:'http://photo.upc.pub/photo/get_city_photos',
                    headers:{
                        'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                    },
                    params:{cityName: name}
                }).then(res =>{
                    let _this = this;
                    let data = res.data;
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
                    }

                    for(let i = 0; i< this.photo_id_all.length ; i++){
                        if(!(_this.getUrlId.some(function (x) {
                            return _this.photo_id_all[i].id === x.id;
                        })))
                        {
                            _this.getThumbnailPhoto(_this.photo_id_all[i]);
                        }
                    }
                }).catch(error =>{
                    console.log(error);
                });

            },

            chooseCondition(index, pic){
                if(this.batchState){
                    this.isChosen(index, pic.id);
                }
                else {
                    this.details(pic)
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
            //批量删除
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
            getThumbnailPhoto(photo) {
                this.$store.dispatch('GetThumbnailPhoto',photo).then(function (res) {

                }).catch(function (error) {
                    console.log(error);
                });
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
    .thumbnail_photo{
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
