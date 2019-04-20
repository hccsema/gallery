<template>
    <p>你好</p>
</template>

<script>
    import axios from '../axios'
    export default {
        name: "Classify",
        created() {
            axios({
                methods: 'get',
                url:'http://photo.upc.pub/album/get_all_album',
                headers:{
                    'authorization': 'Bearer ' + window.localStorage.getItem('Authorization'),
                }
            }).then(res =>{
                console.log(res);
            }).catch(error =>{
                console.log(error);
            })
        }
    }
</script>

<style scoped>

</style>
