<template>
    <el-form
            :model="userInfo"
            status-icon
            :rules="rules"
            ref="userInfo"
            label-width="100px"
            class="ruleForm">
        <el-form-item label="nickname" prop="nickname">
            <el-input type="text" v-model="userInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="username" prop="checkPass">
            <el-input type="text" v-model="userInfo.username" ></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
            <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('userInfo')">更新</el-button>
            <el-button type="primary" @click="getUserInfo"><get></get></el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {getUserInfo} from "@/api/user";
    import axios from 'axios'

    export default {
        name:'UserInfo',
        data() {
            return{
                userInfo:{
                    nickname:'  ',
                    username:'',
                    email:'',
                },
                // rules2: {
                //     nickname: [
                //         { validator: validatePass, trigger: 'blur' }
                //     ],
                //     username: [
                //         { validator: validatePass2, trigger: 'blur' }
                //     ],
                //     email: [
                //         { validator: dddd , trigger : 'blur'}
                //     ]
                // }
            }
        },

        mounted:{

        },
        methods: {

            getUserInfo(){
                let _this = this;
                this.$store.dispatch('getUserInfo').then(function (res) {
                        console.log(res);
                        data = res.data;
                        _this.userInfo.username = res.data.username;
                        _this.userInfo.email = data.email;
                        _this.userInfo.nickname = data.nickname;
                }).catch(function (error) {

                })
                // axios({
                //     methods: 'get',
                //     url: 'http://photo.upc.pub/user/get_info',
                //
                //     headers:{
                //         'authorization' : 'Bearer ' + window.localStorage.getItem('Authorization')
                //     },
                // }).then(function (response) {
                //     _this.userInfo.username = response.data.username;
                //     console.log(response)
                //
                // }).catch(function (error) {
                //     console.log(error)
                //
                // })
            },

            submitForm(userInfo) {
                this.$refs[userInfo].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
