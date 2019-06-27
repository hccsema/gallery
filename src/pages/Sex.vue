<template>
    <el-main>
        <el-form :model="reginForm"
                 ref="ReginForm"
                 class="regform"
                 label-width="0">

            <h3>请设置隐私空间密码</h3>
            <br>
            <el-form-item prop="password">
                <el-input
                        type="password"
                        v-model="reginForm.password"
                        placeholder="密码长度不得低于6位">
                </el-input>
            </el-form-item>
            <el-button @click="submit(reginForm)">提交</el-button>
        </el-form>
    </el-main>
</template>
<script>
    import router from "@/router";
    import axios from "@/axios";
    export default {
        name: "Sex",
        data () {
            return {
                reginForm:{
                    password:'',
                },
            }
        },
        methods:{
            submit()  {
                axios({
                    method: 'post',
                    url: 'http://photo.upc.pub/user/change_security_password',
                    headers: {
                        'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                    },
                    params: {'password':this.reginForm.password},
                }).then(res => {
                    router.push('/loginPrivacy');
                    alert('隐私空间密码设置成功');
                }).catch(error => {
                    console.log(error);
                });
            },
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
