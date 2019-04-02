<template>
        <el-container>
            <el-col :span="6" >
                <img src="../assets/0.png" width="200" height="200">
                <img src="../assets/1.jpg" min-width="200" height="200">
                <img src="../assets/2.jpg" min-width="200" height="200">
                <img src="../assets/3.jpg" min-width="200" height="200">
            </el-col>
            <el-col :span="6">
                <img src="../assets/1.jpg" min-width="200" height="200">
            </el-col>
            <el-col :span="6">
                <img src="../assets/2.jpg" min-width="200" height="200">
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <img src="../assets/3.jpg" min-width="200" height="200">
            </div>
            </el-col>
        </el-container>
</template>

<script>
    export default {
        name: "TimeLine"
    }
</script>

<style scoped>

</style>
