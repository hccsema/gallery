<template>
    <div>
        <h2> 分享列表 </h2>
        <el-dialog
                title="请输入密码："
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <el-form
                     ref="ReginForm"
                     class="regform"
                     label-width="0">
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            v-model="password"
                            placeholder="请输入密码">
                    </el-input>
                </el-form-item>
                <el-button @click="verifyPassword">确认</el-button>
            </el-form>
        </el-dialog>

            <el-row>
                <el-col :span="4" v-for=" (pic , index)  in photo_all " :key="index">
                    <el-card :body-style="{padding: '0.5px'}">
                        <img :src="pic.url"  class="thumbnail_photo">
                    </el-card>
                </el-col>
            </el-row>
    </div>
</template>

<script>
    import {getThumbnailPhotoByShare, getPhotoByShare, getAllBysShare, isPrivate} from "@/api/share";

    export default {
        name: "SharePage",
        data(){
          return{
              password:'',
              centerDialogVisible:false,
              photo_all: [],
          }
        },
        created() {
          isPrivate(this.$route.params.id).then(res=>{
             if(res.data){
                this.centerDialogVisible = true;
             }
             }
         ).catch(error=>{
             //提取状态码
             console.log(error)
         })


        },
        methods:{
            verifyPassword(){
                let that = this;
                getAllBysShare(this.$route.params.id ,this.password).then(res => {
                    this.centerDialogVisible = false;
                    let data = res.data;
                        for(let i=0; i< data.shareList.length; i++){
                             that.getThumbnailPhoto(data.shareList[i]);
                        }
                }).catch(error =>{
                    alert('密码错误');
                    console.log(error);
                })
            },

            getThumbnailPhoto(id){
                getThumbnailPhotoByShare(id).then(response=>{
                    let url = URL.createObjectURL(response.data);
                    this.photo_all.push({id:id,url:url});
                }).catch(error=>{
                    console.log(error);
                })
            }
        }

    }
</script>

<style scoped>
    .thumbnail_photo{
        width: 100%;
        height: 250px;
    }
    .card{
        margin-bottom: 25px;
        border-width: 4px;
    }

</style>
