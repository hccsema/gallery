<template>
    <el-main>
        <el-form :model="reginForm"
                 ref="ReginForm"
                 class="regform"
                 label-width="0">

            <h3>请输入分享密码</h3>
            <br>
            <el-form-item prop="password">
                <el-input
                        type="password"
                        v-model="reginForm.password"
                        placeholder="请输入密码">
                </el-input>
            </el-form-item>
            <el-button @click="submit(reginForm)">确认</el-button>
        </el-form>
    </el-main>
</template>
<script>
    import router from "@/router";
    import axios from "../axios";
    export default {
        name: "ShareLogin",
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
                    method: 'get',
                    url: 'http://photo.upc.pub/share/get/:id',
                    headers: {
                        'ContentType': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                    params: {'password':window.btoa(this.reginForm.password)},
                }).then(res => {
                    router.push('/sharephoto');
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
