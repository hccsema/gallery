<template>
    <div>
      <el-container>
          <el-col :span="6" >
              <img src="../assets/logo.png" min-width="200" height="200">
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

    </div>
</template>

<script>
    export default {
        name: "Home",
        components:{

        }
    }
</script>

<style scoped>

</style>
