<template>
        <el-main>
            <el-form :model="reginForm"
                    ref="ReginForm"
                    class="regform"
                    label-width="0">

                <h3>账号密码登录</h3>
                <br>
                <el-form-item prop="username">
                    <el-input
                            type="text"
                            v-model="reginForm.username"
                            placeholder="请输入账号">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            v-model="reginForm.password"
                            placeholder="请输入密码">
                    </el-input>
                </el-form-item>
                <el-button @click="submit(reginForm)">登录</el-button>
                <el-button @click="register">注册</el-button>
            </el-form>
        </el-main>
</template>
<script>
    import $store from "@/store";
    import axios from "@/axios";

    export default {
        name: "LoginBox",
        data () {
            return {
                reginForm:{
                    username:'',
                    password:'',
                },
            }
        },

        methods:{
            submit :function()  {
                let _this = this;

                this.$store.dispatch('Login',this.reginForm).then( res => {
                    // _this.userToken =  res.headers.authorization;
                    //_this.getUserInfo();
                    //localStorage.setItem("currentViewName",'home');
                    _this.$router.push( '/');
                    alert('登陆成功');
                }).catch(error => {
                    alert('账号或密码错误');
                    console.log(error);
                })
            },
            register:function () {
                this.$router.push('register')
            }
        },
    }
</script>

<style scoped>
    .regform {
        margin: 20px auto;
        width: 310px;
        background: #fff;
        box-shadow: 0 0 10px #B4BCCC;
        padding: 30px 30px 20px 30px;
        border-radius: 25px;
    }
</style>
