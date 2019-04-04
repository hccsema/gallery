<template>
        <el-main>
            <el-form
                    :model="ReginForm"
                    ref="ReginForm"
                    class="regform"
                    label-width="0">

                <h3>账号密码登录</h3>
                <br>
                <el-form-item prop="username">
                    <el-input
                            type="text"
                            v-model="ReginForm.username"
                            placeholder="请输入账号">
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input
                            type="password"
                            v-model="ReginForm.password"
                            placeholder="请输入密码">
                    </el-input>
                </el-form-item>

                <el-button @click="submit">登录</el-button>
                <el-button @click="register">注册</el-button>
            </el-form>
        </el-main>
</template>
<script>
    export default {
        name: "LoginBox",
        data () {
            return {
                ReginForm:{
                    username:'',
                    password:'',
                },
            }
        },
        methods:{
            /*提交进行判断的函数 */
            submit:function(){
                if(this.ReginForm.username==="1"&&this.ReginForm.password==="1")
                    window.location.href="#/"
                else
                    alert("账号或密码错误")
            },
            register:function () {
                window.location.href="#/register"
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
