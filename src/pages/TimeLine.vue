<template>

        <el-container>
            <el-row>
            <el-col :span="6" v-for=" (url, index)  in url_pic ">
               <el-card :body-style="{padding: '0px'}">
                    <img :src="url"  class="humbnail_photo">
               </el-card>
            </el-col>
            </el-row>
        </el-container>

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
                url_pic:[],
            }
        },
        created() {
            let _this = this;
            axios({
                method:'get',
                url: 'http://photo.upc.pub/photo/get_all/',
                headers:{
                    "authorization" : "Bearer " + window.localStorage.getItem('Authorization'),
                }
            }).then(function (res) {
                _this.photo_all = res.data.content;
                _this.photo_id_all = _this.photo_all.map( a => a.id);
                for(let i = 0; i< _this.photo_id_all.length; i++){
                    _this.get_thumbnail_photo(_this.photo_id_all[i]);
                }
            }).catch(function (error){
                console.log(error);
            });
        },
        methods:{
            get_photo(id){
                let _id = id;
                axios({
                    method:'get',
                    url: 'http://photo.upc.pub/photo/get__photo/' + _id,
                    headers:{
                        "authorization" : "Bearer " + window.localStorage.getItem('Authorization'),
                    }
                }).then(function (res) {
                    console.log(res);
                }).catch(function (error){
                    console.log(error);
                });
            },
            get_thumbnail_photo(id){
                let _this = this;
                let _id = id;
                axios({
                    method:'get',
                    url: 'http://photo.upc.pub/photo/get_thumbnail_photo/' + _id,
                    headers:{
                        "authorization" : "Bearer " + window.localStorage.getItem('Authorization'),
                    },
                    responseType: 'blob',
                }).then(function (res) {
                    let data = res.data;
                    let reader = new FileReader();

                    reader.readAsDataURL(data);
                    reader.onload = function () {
                       _this.url_pic.push(this.result);
                    };

                }).catch(function (error){
                    console.log(error);
                });
            }
        },
        computed:{

        }

    }
</script>

<style scoped>
    .humbnail_photo{
        width: 100%;
        height: 270px;
    }
</style>
