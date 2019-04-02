<template>
    <el-tabs el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="UPLOAD" name="first" >
        <Upload></Upload>
        </el-tab-pane>
        <el-tab-pane label="DOWNLOAD" name="second">
        <Download></Download>
        </el-tab-pane>

    </el-tabs>
</template>

<script>
    import Download from "@/components/Download";
    import Upload from "@/components/Upload";
    export default {
        components: {Download, Upload},
        data() {
            return {
                activeName2: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped>

</style>
