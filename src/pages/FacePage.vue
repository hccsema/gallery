<template>
    <div class="containers" >
        <el-row>
            <el-col :span="6" v-for=" (face, index) in url_id " :key="index">
                <el-card :body-style="{padding: '0px' }" class="card" >
                    <img :src="face.url" class="thumbnail_photo" @click="enterFace(face.groupId)">
                    <p class="art_name">这是谁？</p>
                </el-card>
            </el-col>
        </el-row>
    </div>


</template>

<script>
    import {getAllByFace, getPhotoByFace} from "../api/face";
    import router from '../router'

    export default {
        name: "FacePage",
        data(){
            return{
                url_id: [],
            }
        },
        created(){
            getAllByFace().then(res=>{
                console.log(res.data);
                let that = this;
                res.data.forEach(function (data) {
                     that.getPhoto(data);
                })
            }).catch(error=>{
                console.log(error);
            })
        },

        methods:{
            getPhoto(data){
                getPhotoByFace(data.face).then(response=>{
                    let url = URL.createObjectURL(response.data);
                    this.url_id.push({id : data.face.id , url:url ,groupId: data.id});
                }).catch(error=>{
                    console.log(error);
                })
            },
            enterFace(id){
                router.push({name:'Face', params:{id: id}});

            }
        }
    }
</script>

<style scoped>
    .card{
        margin-left: 17px;
        margin-bottom: 25px;
        padding: 1px 1px 1px 1px;
        /*border-radius:30px;*/
    }
    .containers :hover{
        color: #1da2ff;
        border-color: #1da2ff;
    }
    .containers{
        padding-top: 20px;
    }
    .thumbnail_photo{
        width: 100%;
        height: 250px;
    }
    .art_name{
        font-size: large;
    }
</style>
