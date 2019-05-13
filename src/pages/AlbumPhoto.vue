<template>
    <div>
        <h1>
            {{ $route.params.name}}
        </h1>

        <div class="buttons">
            <el-button type="primary"  @click="uploadPhotoInAlbum">上传照片</el-button>
            <el-button type="primary"  @click="batchOptions">批量操作</el-button>
            <el-button type="primary"  @click="batchDel">删除照片</el-button>
        </div>
        <el-container class="container">
            <el-row>
                <el-col :span="6" v-for=" (pic , index)  in type_photos " :offset="0" :key="index">
                    <el-card :body-style="{padding: '0.5px'}"
                             :class="chosenState[index]?  'card_chosen': 'card'">
                        <img :src="pic.url"  class="humbnail_photo" @click="chooseCondition(index, pic.id)">
                    </el-card>
                </el-col>
            </el-row>

            <el-dialog :visible.sync="dialogPhotoVisible" center width="70%">
                <div class="dialog">
                    <el-row>
                        <el-col :span="20">
                            <img :src="url_detail" class="detail_photo">
                        </el-col>
                        <el-col :span="4" >
                        </el-col>
                    </el-row>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="deletePhoto(id_detail)">Delete</el-button>
                    <el-button type="primary" @click="movePhoto(id_detail)"> Remove</el-button>
                </div>
            </el-dialog>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "AlbumPhoto",
        date(){
            return {

            }
        },
        method:{
            uploadPhotoInAlbum(){

            }
        }

    }
</script>

<style scoped>
    .humbnail_photo{
        width: 100%;
        height: 250px;
    }
    .detail_photo{
        padding: 30px 0;
        height: 350px;
    }
    .dialog{
    }
    .card{
        width: 304px;
        height: 250px;
        margin-right: 400px;
        margin-bottom: 25px;
        border-width: 4px;
    }
    /*.container{*/
    /*    padding-top: 59px;*/
    /*}*/
    .buttons{
        position: absolute;
        margin-left: 3px;
        z-index: 999;
    }
    .card_chosen{
        width: 304px;
        height: 250px;
        margin-right: 400px;
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
    .container{
        padding-top: 60px;
    }
</style>
