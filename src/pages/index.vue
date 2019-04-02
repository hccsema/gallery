<template>
    <el-row class="tac">
        <el-col :span="12">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="ghostwhite"
                    text-color="Black"
                    active-text-color="SkyBlue">
                <el-menu-item index="1" >
                    <i class="el-icon-info"></i>
                    <span slot="title" class="label">个人资料</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title" class="label">相册分类</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title" class="label">隐私空间</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
    // export default {
    //     methods: {
    //         handleOpen(key, keyPath) {
    //             console.log(key, keyPath);
    //         },
    //         handleClose(key, keyPath) {
    //             console.log(key, keyPath);
    //         }
    //     }
    // }
</script>
<style>
    .label{
        font-size: 20px;
        text-align: center;
        text-shadow:1px 1px SkyBlue;
    }
  .tac{
      width: 300px;
      margin-top: 250px;
  }

</style>
