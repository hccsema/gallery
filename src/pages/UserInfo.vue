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
        <!--        <el-form-item>-->
                    <el-button type="primary" @click="submitForm('userInfo')">更新</el-button>
        <!--            <el-button type="primary" @click="getUserInfo"><get>显示</get></el-button>-->
        <!--        </el-form-item>-->
    </el-form>
</template>

<script>

    export default {
        name:'UserInfo',
        data() {
            return{
                userInfo:{
                    nickname:'',
                    username:'',
                    email:'',
                }
                // rules: {
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
            this.$store.dispatch('getUserInfo').then(res =>{
                let data = res.data;
                _this.userInfo.nickname = data.nickname;
                _this.userInfo.username = data.username;
                _this.userInfo.email = data.email;
            }).catch(function (error) {
                alert("error!");
                console.log(error);
            })
            },

        mounted:{

        },
        methods: {
            submitForm(userInfo) {
                this.$store.dispatch('changeUserInfo', userInfo).then(res =>{
                    alert('更新成功');
                }).catch(function (error) {
                    alert("更新失败");
                    console.log(error);
                })
            },
        }
    }
</script>

<style scoped>

</style>
