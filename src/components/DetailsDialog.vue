<template>
    <el-dialog :visible.sync="dialogPhotoVisible"
               @close="closeDialog"
               center width="70%">
        <div class="dialog">
            <el-row>
                <el-col :span="16">
                    <div style="text-align:center">
                        <img :src="picDetail.url" class="detail_photo" >
                    </div>
                </el-col>
                <el-col :span="8" >
                    <br>
                    <h3>图片中可能包含:</h3>
                    <p v-if="!picDetail.type"> :(</p>
                    <el-button  v-else
                                v-for="(type, index) in picDetail.type" :key="index"
                                round
                                type="primary"
                                size="small"
                                @click="enterType(type)">
                        {{type}}
                    </el-button>

                    <br><br>
                    <h3>相册:</h3>
                    <p v-if="!picDetail.album.name">该图片暂不归属于任一相册</p>
                    <el-button round
                               type="primary"
                               v-else
                               size="small"
                               @click="enterAlbum(picDetail.album.name, picDetail.album.id)">
                        {{picDetail.album.name}}
                    </el-button>
                    <br><br>
                    <h3>地点:</h3>
                    <p v-if="picDetail.address.country === '' ">该图片未含有位置信息</p>
                    <el-button round
                               type="info"
                               v-if="!(picDetail.address.country === '')"
                               size="small"
                               @click="enterType(picDetail.type)">
                        {{picDetail.address.country}}
                        {{picDetail.address.province}}
                        {{picDetail.address.city}}
                        {{picDetail.address.district}}
                    </el-button>

                    <br><br>
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
    import {getPhoto} from "@/api/photo";
    export default {
        name: "DetailsDialog",
        data() {
            return {
                dialogPhotoVisible:false,
                pic_detail:{address:{
                        country:'',
                        city:'',
                        province:'',
                        district:''
                    }},

            };
        },
        methods:{
            enterType(type){
                router.push({name:'ClassifyPhoto', params:{name:type, id:''}});
            },
            enterAlbum(name,id){
                router.push({name:'AlbumPhoto',params:{name:name, id:id}});
            },
            closeDialog(){
                this.$store.commit('changeDialogPhotoVisible');
              //  URL.revokeObjectURL(this.picDetail.url);
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
                        headers: {
                            'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                        },
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

        },
        computed:{
            visibleValue(){
                return this.$store.getters.getDialogPhotoVisible;
            },
            picDetail(){
                return this.$store.getters.getPicDetail;
            }
        },
        watch:{
            visibleValue(val){
                this.dialogPhotoVisible = val;
            }
        }

    }
</script>

<style scoped>
    .detail_photo{
        padding: 30px 0;
        height: 350px;
    }
</style>
