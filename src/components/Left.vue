<template>
    <div class="aside">
        <el-menu
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                class="el-menu-vertical"
                @open="handleOpen"
                @close="handleClose"
                :router="true">
            <el-menu-item index="/">
                <i class="el-icon-picture-outline"></i>
                <span slot="title">时光轴</span>
            </el-menu-item>
            <el-menu-item index="album" :route="{path: '/album'}">
                <i class="el-icon-menu"></i>
                <span slot="title">相簿</span>
            </el-menu-item>
            <el-menu-item index="classify" :route="{path: '/classify'}">
                <i class="el-icon-orange"></i>
                <span slot="title">智能分类</span>
            </el-menu-item>

            <el-menu-item index="face" :route="{path: '/facePage'}">
                <i class="el-icon-s-check"></i>
                <span slot="title">人像识别</span>
            </el-menu-item>

            <el-menu-item index="load" :route="{path: '/load'}" >
                <i class="el-icon-d-caret" ></i>
                <span slot="title">上传图片</span>
            </el-menu-item>

            <el-menu-item @click="change">
                <i class="el-icon-news" ></i>
                <span slot="title">隐藏空间</span>
            </el-menu-item>

            <el-menu-item index="/map" >
                <i class="el-icon-location"></i>
                <span slot="title">地图相册</span>
            </el-menu-item>

            <el-menu-item index="/login"  >
                <i class="el-icon-d-arrow-left"></i>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>
    import router from "@/router";
    export default {
        name: "Left",
        data(){
            return{

            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            change(){
                if (window.localStorage.getItem('securityToken')){
                    router.push('/loginPrivacy');
                }
                else{
                    router.push('/sex');
                }
            },
        }
    }
</script>

<style scoped>

</style>
