<template>
    <el-main>
        <el-form :model="ReginForm" ref="ReginForm" class="regform" label-width="0" :rules="FormRule">

            <h3>账号密码登录</h3>
            <br>
            <el-form-item prop="username">
                <el-input type="text" v-model="ReginForm.username" placeholder="请输入账号"></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input type="password" v-model="ReginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-button @click="submit('ReginForm')">登录</el-button>
            <el-button @click="register">注册</el-button>
        </el-form>
    </el-main>
</template>
<script>

    export default {
        name: "LoginBox",
        data () {
            return {
                userToken:'',
                ReginForm:{
                    username:this.username,
                    password:this.password,
                },
                FormRule:{
                    username: [
                        { required: true, message: '请填写用户名！', trigger: 'blur' },
                        { type: 'string', min: 6, message: '用户名长度不小于6位！', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码！', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不小于6位！', trigger: 'blur' }
                    ]},
            }
        },
        methods: {
            /*提交进行判断的函数 */
            submit(ReginForm) {
                this.$refs[ReginForm].validate((valid) => {
                    if (valid) {
                        this.login();
                        alert('成功！');
                    } else {
                        console.log('失败！');
                        return false;
                    }
                });
            },

            login() {
                let _this = this;
                this.$store.dispatch('Login',this.ReginForm).then(res => {
                    _this.userToken =  res.data.token;
                    //_this.getUserInfo();
                    _this.$router.push('/');
                    alert('登陆成功');
                }).catch(error => {
                    alert('账号或密码错误');
                    console.log(error);
                })
            }
        }
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
