<template>
    <div class="header">
        <el-menu :default-active="activeIndex"
                 class="el-menu"
                 mode="horizontal"
                 @select="handleSelect"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
            <el-menu-item index="1">写点</el-menu-item>
            <el-menu-item index="3">什么</el-menu-item>
            <el-menu-item index="4">好呢</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
    }
</script>

<style scoped>
.header{

}
</style>
