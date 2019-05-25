<template>
    <div>
        <el-container ref="homePage">
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside style="width: 200px">
                    <Left></Left>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                    <scroll-top></scroll-top>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Left from '../components/Left'
    import Header from '../components/Header'
    import ScrollTop from '../components/ScrollTop'
    export default {
        name: "Home",
        data(){
            return{
                clientHeight:'',
            }

        },
        components:{
            Left,
            Header,
            ScrollTop
        },
        created(){

        },
        mounted() {
            this.clientHeight = `${document.documentElement.clientHeight}`;
            window.onresize = function temp() {
                this.clientHeight = `${document.documentElement.clientHeight}`;
            };
        },
        watch:{
            clientHeight: function () {
                this.changeFixed(this.clientHeight)
            },


        },
        methods: {
            changeFixed(clientHeight){
                this.$refs.homePage.$el.style.height = clientHeight+'px'
            }
    },
    }
</script>

<style scoped>

    .el-header, .el-footer {
        background-color: #545c64;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #545c64;
        color: #333;
        text-align: left;
        line-height: 200px;

    }

    .el-main {
      background-color: white;
      color: #333;
      text-align: center;
      /*line-height: 160px;*/
    }

    /*body > .el-container {*/
    /*    margin-bottom: 40px;*/
    /*}*/

    /*.el-container:nth-child(5) .el-aside,*/
    /*.el-container:nth-child(6) .el-aside {*/
    /*    line-height: 260px;*/
    /*}*/

    /*.el-container:nth-child(7) .el-aside {*/
    /*    line-height: 220px;*/
    /*}*/
</style>
