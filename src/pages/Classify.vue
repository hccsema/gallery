<template>
    <container class="containers" >
        <el-row>
            <el-col :span="6" v-for=" (art, index) in classify_cover_photo  " :key="index">
                <el-card :body-style="{padding: '0px'}" class="card" >
                    <img :src="art.url"  height="230" width="240" @click="enterClassifyPhoto(art.name)">
                    <p class="art_name">{{art.name}}</p>
                </el-card>
            </el-col>
        </el-row>
    </container>
</template>

<script>
    import router from '../router'
    export default {
        name: "Classify",
        data(){
            return{
                classify_cover_photo:[],
            }
        },
        created() {
            this.$store.dispatch('GetTypeList').then(response=>{
                let data = response.data;
                for(let key in data){
                    if(data[key] !== 0) {
                       this.getTypeCoverPhoto(key,data[key]);
                    }
                }
            }).catch(error =>{
                console.log(error);
            });
        },
        methods:{

            getTypeCoverPhoto(type,number){

                this.$store.dispatch('GetPhotoByType',type).then(res=>{
                    let data = res.data;
                    this.getThumbnailPhotoInCover(data.id, type, number)
                }).catch(error=>{
                    console.log(error);
                })
            },


            /*
                在state.url_id中查找
                不存在请求，并放入url_id中
             */

            getThumbnailPhotoInCover(id,type,number){
                let _this = this;
                this.$store.dispatch('GetThumbnailPhotoInCover',id).then(function (res) {
                    let url = URL.createObjectURL(res.data);
                    let cover = {'name':type,'url':url,'size':number};
                    _this.classify_cover_photo.push(cover);
                    _this.classify_cover_photo.sort(
                        function(a,b) {
                            return b.size - a.size;})
                }).catch(error =>{
                    console.log(error);
                });
            },

            enterClassifyPhoto(type){
                router.push({name:'ClassifyPhoto', params:{type:type}});
            },
        }
    }
</script>

<style scoped>
    .card{

        margin-left: 17px;
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
