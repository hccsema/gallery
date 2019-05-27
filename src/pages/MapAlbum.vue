<template>
    <div class="amap-page-container">
        <el-amap vid="amapDemo" :zoom="5" :center="[103.9746093750,35.7821707033]" class="amap-demo">
            <el-amap-marker v-for="city in city_info"
                            :icon="city.url"
                            :position="[parseFloat(city.location['longitude']),parseFloat(city.location['latitude'])]"
                            :clickable="true">
                <img :src="city.url" @click="enterCityPhoto(city.city)" height="60" width="60">
            </el-amap-marker>
        </el-amap>
    </div>
</template>

<script>
    import router from "@/router";
    export default {
        data(){
            return{
                city_info:[],
            }
        },
        created() {
            this.$store.dispatch('GetCityList').then(res=>{
                for(let key in res.data){
                    this.getAllByCity(key);
                }
            }).catch(error =>{
                console.log(error);
            });
        },
        methods:{
            getAllByCity(name){
                this.$store.dispatch('GetCityCoverInfo',name).then(res => {
                    this.getCityThumbnailPhotoCover(res.data.id,res.data.location,name);
                }).catch(error => {
                    console.log(error);
                });
            },
            getCityThumbnailPhotoCover(id,location,name){
                this.$store.dispatch('GetThumbnailPhotoInCover',id).then(res=> {
                    let url = URL.createObjectURL(res.data);
                    let cover = {'url':url,'city':name,'location':location};
                    this.city_info.push(cover);
                }).catch(error =>{
                    console.log(error);
                });
            },
            enterCityPhoto(name){
                router.push({name:'MapPhoto', params:{name:name, lol:''}});
            },
        },
    }
</script>

<style>
    .amap-page-container {
        height: 620px;
    }
</style>
