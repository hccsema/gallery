<template>
    <el-upload
            class="upload-demo"
            action="http://photo.upc.pub/photo/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>

</template>

<script>
export default {
    data() {
        return {
            fileList: [
                {
                    name: '0.png',
                    url: require('../assets/0.png')
                },

                {
                    name: '2.jpg',
                    url:require('../assets/2.jpg')
                }
                ]
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    }
}
</script>

<style scoped>

</style>
