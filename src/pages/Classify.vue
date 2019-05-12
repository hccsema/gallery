<template>
    <el-container class="containers" >
        <el-row>
            <el-col :span="6" v-for=" (art, index) in classify_album  " :key="index">
                <el-card :body-style="{padding: '0px'}" class="card" >
                    <img :src="art.url"  height="230" width="240" @click="getClassifyPhoto(art.name)">
                    <p class="art_name">{{art.name}}</p>
                </el-card>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    import axios from '../axios'
    import router from '../router'
    export default {
        name: "Classify",
        data(){
            return{
                classify_album:[],
            }
        },
        created() {
            axios({
                method: 'get',
                url:'http://photo.upc.pub/photo/get_type_list',
                headers:{
                    'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                },
            }).then(res =>{
                let data = res.data;
                for(let key in data){
                    if(data[key]!==0) {
                        axios({
                            method: 'get',
                            async:false,
                            url:'http://photo.upc.pub/photo/get_photo_by_type',
                            params:{typeName:key},
                            headers:{
                                'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                            },
                        }).then(res =>{
                            let _this = this;
                            axios({
                                method: 'get',
                                url: 'http://photo.upc.pub/photo/get_thumbnail_photo/' + res.data.id,
                                headers: {
                                    "authorization": "Bearer " + window.localStorage.getItem('Authorization'),
                                },
                                responseType: 'blob',
                            }).then(function (res) {
                                let url = URL.createObjectURL(res.data);
                                _this.classify_album.push({'name':key,'url':url,'size':res.data.size});
                                _this.classify_album.sort(function(a,b) {
                                    return a.size - b.size;
                                })
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }).catch(error =>{
                            console.log(error);
                        });
                    }
                }
            }).catch(error =>{
                console.log(error);
            });
        },
        methods:{
            getClassifyPhoto(type){
                this.$store.dispatch('GetClassifyPhoto',type).then(res =>{
                    router.push("/ClassifyPhoto");
                }).catch(error => {
                    console.log(error);
                });
            },
        }
    }
</script>

<style scoped>
    .card{
        width: 280px;
        height: 290px;
        margin-left: 17px;
        margin-right: 400px;
        margin-bottom: 25px;
        padding-top: 18px;
        /*border-radius:30px;*/
    }
    .containers :hover{
        color: #1da2ff;
        border-color: #1da2ff;
    }
    .containers{
        padding-top: 20px;
    }
    .art_name{
        font-size: large;
    }
</style>
