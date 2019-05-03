<template>
    <div>
        <div class="buttons">
            <el-button type="primary" @click="create">创建相册</el-button>
            <el-button type="primary" @click="batchdel">批量删除</el-button>
            <el-button type="primary" @click="del">删除相册</el-button>
        </div>
        <el-container class="containers">
            <el-row>
                <el-checkbox-group v-model="checkedlist">
                    <el-col :span="6" v-for=" (art, index) in album  " :key="index">
                        <el-card :body-style="{padding: '0px'}" class="card" >
                            <div class="checkboxs">
                                <el-checkbox :label="art.id" v-show="show" @click="addId(art.id)">&nbsp;</el-checkbox>
                            </div>
                            <img src="../assets/folder.jpg"  height="230" width="240">
                            <p class="art_name">{{art.name}}</p>
                        </el-card>
                    </el-col>
                </el-checkbox-group>
            </el-row>
        </el-container>
    </div>
</template>

<script>
    import axios from '../axios'
    import qs from 'qs'
    import router from '../router'
    export default {
        name: "Classify",
        data(){
            return{
                album:[],
                show: false,
                checkedlist:[],
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
            create: function () {
                router.push("create");
            },
            del:function () {
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
                        router.push("album");
                    }).catch(error => {
                        console.log(error);
                    })
                }
            },
            batchdel:function () {
                this.show = !this.show;
            },
            addId(id){
                this.checkedlist.push(id);
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
    .containers :hover{
        color: #1da2ff;
        border-color: #1da2ff;
    }
    .containers{
        padding-top: 60px;
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
