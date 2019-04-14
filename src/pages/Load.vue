<template>
    <el-tabs  v-model="activeName" type="border-card" @tab-click="handleClick" style="height: 500px">
        <el-tab-pane name="upload">
            <span slot="label"><i class="el-icon-upload2"></i> UPLOAD</span>
            <Upload></Upload>
        </el-tab-pane>
        <el-tab-pane label="DOWNLOAD" name="download">
            <span slot="label"><i class="el-icon-download"></i> DOWNLOAD</span>
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
                activeName: 'upload'
            };
        },
        methods: {
            handleClick(tab, event) {
                //console.log(tab, event);
            }
        }
    }
</script>

<style scoped>

</style>
