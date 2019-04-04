<template>
    <div class="aside">
        <el-menu
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                class="el-menu-vertical"
                @open="handleOpen"
                @close="handleClose"
                router>
            <el-menu-item index="/">
              <i class="el-icon-picture-outline"></i>
              <span slot="title">时光轴</span>
            </el-menu-item>
            <el-menu-item index="#">
                <i class="el-icon-menu"></i>
                <span slot="title">分类相册</span>
            </el-menu-item>
             <el-menu-item index="/load" >
              <i class="el-icon-d-caret" ></i>
              <span slot="title">上传下载</span>
            </el-menu-item>

            <el-menu-item index="/sex" >
              <i class="el-icon-news" to="/sex"></i>
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
  export default {
        name: "Left",
        methods: {
          handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          }
        }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.aside{
    width: 100%;
}
</style>
