<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="相册名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="相册描述">
            <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
            <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import axios from '../axios';
    import router from "@/router";
    export default {
        name:'CreateAlbum',
        data() {
            return {
                form: {
                    name: '',
                    description:'',
                }
            }
        },
        methods: {
            onSubmit() {
                axios({
                    method: 'post',
                    url:'http://photo.upc.pub/album/create',
                    headers:{
                        'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                    },
                    data:this.form
                }).then(res =>{
                    if(res) {
                        router.push("album");
                    }
                }).catch(error =>{
                    console.log(error);
                })
            },
            onCancel:function () {
                router.push("album");
            }
        }
    }
</script>
