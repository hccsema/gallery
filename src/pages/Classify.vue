<template>
    <div>
        <div class="buttons">
            <el-button type="primary" @click="create">创建相册</el-button>
            <el-button type="primary" @click="batchdel">批量删除</el-button>
            <el-button type="primary" @click="del">删除相册</el-button>
        </div>
        <el-container class="containers">
            <el-row>
                <el-col  :span="6" v-for=" (name,index)  in album_name ">
                    <el-card :body-style="{padding: '0px'}" class="card">
                        <div class="checkboxs">
                            <el-checkbox  v-show="show[index]"></el-checkbox>
                        </div>
                        <img src="../assets/folder.jpg"  height="230" width="240">
                        <p>{{name}}</p>
                    </el-card>
                </el-col>
            </el-row>
        </el-container>
    </div>
</template>

<script>
    import axios from '../axios'
    export default {
        name: "Classify",
        data(){
            return{
                album:[],
                album_name:[],
                album_id:[],
                show:[],
                length:'',
            }
        },
        created() {
            axios({
                methods: 'get',
                url:'http://photo.upc.pub/album/get_all_album',
                headers:{
                    'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                },
            }).then(res =>{
                let _this = this;
                let data = res.data;
                for(let i=0; i < data.length ;i++)
                {
                    _this.album_name.push(data[i]['name']);
                    _this.album_id.push(data[i]['id']);
                    _this.show.push(false);
                    _this.length = data.length;
                }
            }).catch(error =>{
                console.log(error);
            })
        },
        methods:{
            create: function () {
                window.location.href="/create";
            },
            del:function () {

            },
            batchdel:function () {
                for(let i=0; i<this.length; i++) {
                    this.show.pop();
                }
                for(let i=0; i<this.length; i++){
                    this.show.push(true);
                }
            },
        }
    }
</script>

<style scoped>
    .buttons{
        position: absolute;
        margin-left: 17px;
        x-index: 60px;
        z-index: 999;
    }
    .card{
        width: 280px;
        height: 290px;
        margin-left: 17px;
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
        padding-top: 0px;
        padding-left: 235px;
        z-index: 999;
    }
</style>
