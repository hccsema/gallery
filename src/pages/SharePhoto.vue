<template>

</template>

<script>
    export default {
        name: "SharePhoto",
        created(){
            axios({
                method: 'get',
                url: 'http://photo.upc.pub/share/get/:id',
                headers: {
                    'ContentType': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                params: {'password':window.btoa(this.reginForm.password)},
            }).then(res => {
                router.push('/sharephoto');
            }).catch(error => {
                console.log(error);
            });
        },
        methods:{

        },
    }
</script>

<style scoped>

</style>
