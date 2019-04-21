<template>
    <el-row class="container ">
        <el-col :span="4" class="topbar-wrap fixed-top">
            <div class="topbar-logo topbar-btn fixed-top">
               <h3 style="color:deepskyblue">Gallery</h3>
            </div>
        </el-col>
        <el-col :span="3" :offset="17">
            <el-dropdown>
                <span class="topbar-logo topbar-btn fixed-top">
                    <img src="../assets/1.jpg" class="round_icon" alt="error" @click="userInfo">
                </span>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item>
                        <span @click="userInfo" >个人信息</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <span @click="changePassword">修改密码</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css'
    import router from '../router.js'
        export default {
            data(){
                return {
                    loading: false,
                    companyName: '',
                    nickname: '',
                    defaultActiveIndex: '/',
                    homeMenu: false,
                    messageCount: 5
                }
            },
            created() {

            },
            methods: {
                changePassword() {
                    router.push('/changePwd');
                },
                userInfo(){
                    router.push('/info');
                },

                logout(){
                    //logout
                    this.$confirm('确认退出吗?', '提示', {
                        confirmButtonClass: 'el-button--warning'
                    }).then(() => {
                        //确认
                        localStorage.removeItem('userInfo');
                        localStorage.removeItem('Authorization');
                        router.push('/login');
                    }).catch(() => {});
                }
            },
            mounted() {
                // let user = window.localStorage.getItem('userInfo');
                // if (user) {
                //     //将json改为js对象
                //     user = JSON.parse(user);
                //     this.nickname = user.nickname || '';
                //     //this.companyName = user.companyName || '';
                // }
            },
            watch: {

            }
        }


</script>

<style scoped>

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }

    .round_icon{
        width: 50px;
        height: 50px;
        display: flex;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        margin-top: 6px;
        margin-left: -65px;
    }

</style>
