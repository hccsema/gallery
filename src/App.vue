<template>
  <div id="app">
    <el-container>

      <el-header>
        <Header></Header>
      </el-header>
    <el-container>
      <el-aside style="width: 200px">
        <Left></Left>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
<!--      <el-container>-->
<!--        <el-col :span="4">-->
<!--          <el-aside style="width: 100%">-->
<!--           <Left></Left>-->
<!--          </el-aside>-->
<!--        </el-col>-->
<!--        <el-col :span="20">-->
<!--            <router-view></router-view>-->
<!--        </el-col>-->
<!--      </el-container>-->
    </el-container>
  </div>
</template>

<script>
import Left from './components/Left'
import Header from './components/Header'

export default {
  name: 'app',
  components: {
    Left,
    Header,
  }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;

  }

  /*.el-main {*/
  /*  background-color: white;*/
  /*  color: #333;*/
  /*  text-align: center;*/
  /*  line-height: 160px;*/
  /*}*/

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 220px;
  }
</style>
