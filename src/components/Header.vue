<template>
<!--    <div class="header">-->
<!--        <el-menu :default-active="activeIndex"-->
<!--                 class="el-menu"-->
<!--                 mode="horizontal"-->
<!--                 @select="handleSelect"-->
<!--                 background-color="#545c64"-->
<!--                 text-color="#fff"-->
<!--                 active-text-color="#ffd04b">-->

<!--            <el-menu-item index="1" class="ddd">写点</el-menu-item>-->
<!--            <el-menu-item index="3" >什么</el-menu-item>-->
<!--            <el-menu-item index="4" >好呢</el-menu-item>-->

<!--        </el-menu>-->
<!--    </div>-->

    <el-row class="container ">
        <!--头部-->
        <el-col :span="6" class="topbar-wrap fixed-top">
            <div class="topbar-logo topbar-btn fixed-top">
               <h3 style="color: greenyellow">Wonder4 智能分类云相册</h3>
            </div>
        </el-col>

        <el-col :span="17"></el-col>
        <el-col :span="1">
        <el-dropdown>
<!--              <span class="el-dropdown-link">-->
                   <div class="topbar-logo topbar-btn fixed-top">
                            <a href="/"><img src="../assets/1.jpg" class="round_icon"></a>
                   </div>
<!--              </span>-->
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <div @click="infomation">
                            <span style="color: #555;font-size: 14px;">个人信息</span>
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <div @click="changepassword">
                            <span style="color: #555;font-size: 14px;">修改密码</span>
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css'
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
                road.$on('setNickName', (text) => {
                    this.nickname = text;
                });

                road.$on('goto', (url) => {
                    if(url === "/login") {
                        localStorage.removeItem('access-user');
                        this.$router.push(url);
                    }
                });
                // 组件创建完后获取数据
                this.fetchNavData();
            },
            methods: {
                changepassword() {
                    window.location.href="#/changepassword";
                },
                infomation() {
                    window.location.href="#/info";
                },
                handleSelect(index){
                    this.defaultActiveIndex = index;
                },
                fetchNavData () { // 初始化菜单激活项
                    let cur_path = this.$route.path; //获取当前路由
                    let routers = this.$router.options.routes; // 获取路由对象
                    let nav_type = "", nav_name = "";
                    for (var i = 0; i < routers.length; i++) {
                        let children = routers[i].children;
                        if(children){
                            for (let j = 0; j < children.length; j++) {
                                if (children[j].path === cur_path) {
                                    nav_type = routers[i].type;
                                    nav_name = routers[i].name;
                                    break;
                                }
                                // 如果该菜单下还有子菜单
                                if(children[j].children) {
                                    let grandChildren = children[j].children;
                                    for(let z=0; z<grandChildren.length; z++) {
                                        if(grandChildren[z].path === cur_path) {
                                            nav_type = routers[i].type;
                                            nav_name = routers[i].name;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    this.$store.state.topNavState = nav_type;
                    this.$store.state.leftNavState = nav_name;
                    if(nav_type == "home"){
                        this.defaultActiveIndex = "/";
                    } else {
                        this.defaultActiveIndex = "/" + nav_name + "Manager";
                    }
                },
                logout(){
                    //logout
                    this.$confirm('确认退出吗?', '提示', {
                        confirmButtonClass: 'el-button--warning'
                    }).then(() => {
                        //确认
                        localStorage.removeItem('access-user');
                        window.location.href="#/login";
                    }).catch(() => {});
                }
            },
            mounted() {
                let user = window.localStorage.getItem('access-user');
                if (user) {
                    user = JSON.parse(user);
                    this.nickname = user.nickname || '';
                    this.companyName = user.companyName || '';
                }
            },
            watch: {
                '$route': function(to, from){ // 路由改变时执行
                    //console.info("to.path:" + to.path);
                    this.fetchNavData();
                }
            }
        }


</script>

<style scoped>
    .ddd{
        float: right;

    }

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
