<template>

    <el-upload
            class="upload-demo"
            action="http://photo.upc.pub/photo/upload"
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            multiple="True">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">单张图片不得超过30MB</div>
    </el-upload>

</template>

<script>

    export default {
        data() {
            return{
                fileList:[],
            }
        },
        computed:{
            headers(){
                return{
                    'authorization' : 'Bearer ' + window.localStorage.getItem('Authorization')
                }
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
        }
    }
</script>

<style scoped>

</style>
