<template>
    <el-dialog :visible.sync="dialogPhotoVisible"
               @close="closeDialog"
               center width="70%">
        <div class="dialog">
            <el-row>
                <el-col :span="16">
                    <div style="text-align:center">
                        <img :src="picDetail.url"  class="detail_photo">
                    </div>
                </el-col>
                <el-col :span="8" >
                    <br>

                    <h3>相册:</h3>
                    <p v-if="picDetail.album.name ===''"> 该图片暂不归属于任一相册 :)</p>
                    <el-button v-else
                               round
                               type="primary"

                               size="small"
                               @click="enterAlbum(picDetail.album.name, picDetail.album.id)">
                        {{picDetail.album.name}}
                    </el-button>

                    <br><br>
                    <h3>地点:</h3>
                    <p v-if="picDetail.address.country === '' ">该图片未含有位置信息 :)</p>
                    <el-button round
                               type="primary"
                               v-if="!(picDetail.address.country === '')"
                               size="small"
                               @click="enterCity(picDetail.address.city)">
                        {{picDetail.address.country}}
                        {{picDetail.address.province}}
                        {{picDetail.address.city}}
                        {{picDetail.address.district}}
                    </el-button>
                    <br><br>

                    <div v-if="picDetail.type !== []">
                    <h3>图片中可能包含:</h3>
                    <el-button
                                v-for="(type, index) in picDetail.type" :key="index"
                                round
                                type="primary"
                                size="small"
                                @click="enterType(type)">
                        {{type}}
                    </el-button>

                    <br><br>
                    </div>


                    <div v-if="picDetail.faces.length">
                    <h3>图片中可能含有的人物:</h3>
                        <img    v-for="(face, index) in faceList" :key="index"
                                :src="face.url"
                                class="round_face_photo"
                                @click="enterFace(face.groupId)">
<!--                        <p>{{face.name}}</p>-->
                    </div>



                </el-col>
            </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deletePhoto(picDetail.id)">删除</el-button>
            <el-button type="primary" @click="hidePhoto(picDetail.id)">隐藏</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import router from '../router'
    import axios from '../axios'
    import {getPhotoByFace} from "../api/face";

    export default {
        name: "DetailsDialog",
        data() {
            return {
                dialogPhotoVisible:false,
                face_list:[],
                pic_detail:{},

            };
        },
        created(){
        },
        methods:{
            enterType(type){
                router.push({name:'ClassifyPhoto', params:{name:type,id:''}});
                this.closeDialog();
            },
            enterAlbum(name,id){
                router.push({name:'AlbumPhoto',params:{name:name, id:id}});
            },
            enterCity(name){
                router.push({name:'MapPhoto', params:{name:name,lol:''}});
            },
            closeDialog(){
                this.$store.commit('changeDialogPhotoVisible');
            },
            enterFace(id){
                router.push({name:'Face', params:{id:id}});
            },
            deletePhoto(id){
                let _this = this;
                this.$store.dispatch('DeletePhoto',id).then( res =>{
                    alert('删除成功');
                    _this.dialogPhotoVisible=false;
                }).catch(error =>{
                    alert('删除失败');
                    console.log(error);
                })
            },

            hidePhoto(id){
                if(window.localStorage.getItem('securityToken')){
                    axios({
                        method: 'post',
                        url: 'http://photo.upc.pub/photo/change_to_security',
                        params: {'photoId':id, 'securityToken':window.localStorage.getItem('securityToken')},
                    }).then(res => {
                        alert('隐藏成功');
                        this.dialogPhotoVisible=false;
                    }).catch(error => {
                        alert('隐藏失败');
                        console.log(error);
                    })
                }
                else{
                    alert("暂未开启隐私空间，请前往设置");
                    router.push('./sex');
                }
            },


            // getPhoto(){
            //     let pic = this.picDetail;
            //     this.face_list = [];
            //     if (pic.faces.length) {
            //         pic.faces.forEach(function (face) {
            //             getPhotoByFace(face.id).then(res=>{
            //                 face.url = URL.createObjectURL(res.data);
            //                 pic.face_list.push(face);
            //             }).catch(error=>{
            //                 console.log(error)
            //             })
            //         })
            //     }
            //
            //     this.$store.dispatch('GetPhoto', pic.id).then(res=>{
            //         URL.revokeObjectURL(pic.url);
            //         pic.url = URL.createObjectURL(response.data);
            //         console.log(pic);
            //     }).catch(error=>{
            //         console.log(error);
            //     })
            // }

        },
        computed:{
            visibleValue(){
                return this.$store.getters.getDialogPhotoVisible;
            },
            picDetail(){
                return this.$store.getters.getPicDetail;
            },
            faceList(){
                return this.$store.getters.getFaceList;
            },
            detailUrl(){
                return this.$store.getters.getDetailUrl;
            }
        },
        watch:{
            visibleValue(val){
                this.dialogPhotoVisible = val;
            },
            picDetail(val){

            }
        }

    }
</script>

<style scoped>
    .detail_photo{
        width: 90%;
        height: 90%;
        padding: 20px 0;

    }
    .round_face_photo{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        margin-top: 6px;
        margin-left: 10px;
    }
</style>
