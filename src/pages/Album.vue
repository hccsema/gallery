<template>
    <div>
        <div class="buttons">
            <el-button type="primary" @click="createAlbum">创建相册</el-button>
            <el-button type="primary" @click="batchdel">批量删除</el-button>
            <el-button type="primary" @click="deleteAlbum">删除相册</el-button>
        </div>
        <container class="container">
            <el-row>
                <el-checkbox-group v-model="checkedlist">
                    <el-col :span="6" v-for=" (art, index) in album " :key="index" >
                        <el-card :body-style="{padding: '0px'}"
                                 class="card"
                                 >
                            <div class="checkboxs">
                                <el-checkbox :label="art.id" v-show="show"
                                >{{nothing}}</el-checkbox>
                            </div>
                            <img src="../assets/folder.jpg"  height="230" width="240" @click="enterAlbum(art.id, art.name)">
                            <p class="art_name">{{art.name}}</p>
                        </el-card>
                    </el-col>
                </el-checkbox-group>
            </el-row>
        </container>
    </div>
</template>

<script>
    import axios from '../axios'
    import qs from 'qs'
    import router from '../router'
    export default {
        name: "Album",
        data(){
            return{
                album:[],
                show: false,
                checkedlist:[],
                nothing:''
            }
        },
        created() {
            axios({
                method: 'get',
                url:'http://photo.upc.pub/album/get_all_album',
                headers:{
                    'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                },
            }).then(res =>{
                let _this = this;
                let data = res.data;
                for(let i=0; i < data.length ;i++)
                {
                    _this.album.push({name:data[i]['name'],id:data[i]['id']});
                }
            }).catch(error =>{
                console.log(error);
            })
        },
        methods:{
            createAlbum () {
                router.push("create");
            },
            enterAlbum(id, name) {
                console.log('dd');
                router.push({name:'AlbumPhoto',params: {name:name, id:id}});
                // router.push('albumPhoto')
            },

            deleteAlbum() {
                for (let i = 0; i < this.checkedlist.length; i++) {
                    axios({
                        method: 'post',
                        url: 'http://photo.upc.pub/album/delete',
                        headers: {
                            'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                            'ContentType':'application/x-www-form-urlencoded',
                        },
                        async:false,
                        data: qs.stringify({id:this.checkedlist[i]}),
                    }).then(res => {
                        console.log(res);
                        window.location.href="/album";
                    }).catch(error => {
                        console.log(error);
                    })
                }
            },
            batchdel:function () {
                this.show = !this.show;
            },
        }
    }
</script>

<style scoped>
    .buttons{
        position: absolute;
        margin-left: 17px;
    }
    .card{
        width: 280px;
        height: 290px;
        margin-left: 17px;
        margin-right: 400px;
        margin-bottom: 25px;
        padding-top: 18px;
        border-radius:30px;
    }
    .container :hover{
        color: #1da2ff;
        border-color: #1da2ff;
    }
    .container{
        margin-top: 60px;

    }
    .checkboxs{
        position: absolute;
        padding-left: 235px;
        z-index: 999;
    }
    .art_name{
        font-size: large;
    }
</style>
