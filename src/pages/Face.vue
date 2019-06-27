<template>
    <div class="containers">
        <el-row>
            <el-col :span="6" v-for=" (face, index) in url_id " :key="index">
                <el-card :body-style="{padding: '0px' }" class="card" >
                    <img :src="face.url"  height="230" width="240">
                    <!--                    <p class="art_name">{{art.name}}</p>-->
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getPhotoByFace, getFaceGroup} from "@/api/face";
    export default {
        name: "Face",
        data(){
            return{
                photo_list:[],
                url_id:[],

            }
        },
        created() {
            let that = this;
            let id  = this.$route.params.id;
            getFaceGroup(id).then(res =>{

                let data = res.data;
                console.log(res);
                for (let i in data.faces){
                    getPhotoByFace(i).then(response=>{
                        let url =  URL.createObjectURL(response.data);
                        that.url_id.push({id: i, url: url});

                    }).catch(error=>{
                        console.log(error)
                    })

                }

                // res.data.faces.forEach(function (data) {
                //     getPhotoByFace(data).then(response=>{
                //         let url =  URL.createObjectURL(response.data);
                //         that.url_id.push({id: data.id, url: url});
                //
                //     }).catch(error=>{
                //         console.log(error)
                //     })
                // })
            }).catch(error=>{
               console.log(error);
            });



        },
        methods:{

        }
    }
</script>

<style scoped>

</style>
