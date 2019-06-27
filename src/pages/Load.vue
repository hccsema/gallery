<template>
    <el-tabs  v-model="activeName" type="border-card" @tab-click="handleClick" style="height: 500px">
        <el-tab-pane name="upload">
            <span slot="label"><i class="el-icon-upload2"></i> UPLOAD</span>
            <Upload></Upload>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import Upload from "@/components/Upload";
    export default {
        components: {Upload},
        data() {
            return {
                activeName: 'upload'
            };
        },
        methods: {
            handleClick(tab, event) {

            }
        }
    }
</script>

<style scoped>

</style>
