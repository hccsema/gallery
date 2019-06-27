<template>
    <el-main>
        <el-form :model="reginForm"
                 ref="ReginForm"
                 class="regform"
                 label-width="0">

            <h3>请输入隐私空间密码</h3>
            <br>
            <el-form-item prop="password">
                <el-input
                        type="password"
                        v-model="reginForm.password"
                        placeholder="请输入密码">
                </el-input>
            </el-form-item>
            <el-button @click="submit(reginForm)">进入隐私空间</el-button>
        </el-form>
    </el-main>
</template>
<script>
    import router from "@/router";
    import axios from "@/axios";
    export default {
        name: "LoginPrivacy",
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
                    url: 'http://photo.upc.pub/user/get_security',
                    headers: {
                        'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                    },
                    params: {'password':this.reginForm.password},
                }).then(res => {
                    this.$store.dispatch('SaveSecurityToken',res.data).then( res => {
                        console.log(res);
                    }).catch(error => {
                        console.log(error);
                    });
                    router.push('/privacy');
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
