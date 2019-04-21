<template>
    <el-form
            :model="userInfo"
            status-icon
            :rules="rules"
            ref="userInfo"
            label-width="100px"
            class="ruleForm">
        <el-form-item label="nickname" prop="nickname">
            <el-input type="text" v-model="nickname"></el-input>
        </el-form-item>
        <el-form-item label="username" prop="checkPass">
            <el-input type="text" v-model="username" ></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
            <el-input v-model="email"></el-input>
        </el-form-item>
        <!--        <el-form-item>-->
                    <el-button type="primary" @click="submitForm('userInfo')">更新</el-button>
        <!--            <el-button type="primary" @click="getUserInfo"><get>显示</get></el-button>-->
        <!--        </el-form-item>-->
    </el-form>
</template>

<script>
    //import {getUserInfo} from "@/api/user";
    import axios from "../axios";

    export default {
        name:'UserInfo',
        data() {
            return{
                nickname:'  ',
                username:'',
                email:'',
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
        created(){
            let _this = this;
            axios({
                method:'get',
                url: 'http://photo.upc.pub/user/get_info/',
                headers:{
                    "authorization" : "Bearer " + window.localStorage.getItem('Authorization'),
                }
            }).then(res => {
                let data = res.data;
                _this.nickname = 'gallery';
                _this.username = data.username;
                _this.email = data.email;
            }).catch(function (error){
                console.log(error);
            });
        },

        mounted:{

        },
        methods: {

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
