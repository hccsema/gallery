<template>
  <div id="app">
    <Index></Index>
  </div>
</template>

<script>
    import tac from './pages/index'
export default {
  name: 'app',
  components:{
      'Index':tac
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
