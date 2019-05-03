<template>
    <div class="profile-page sidebar-collapse">
                <Nav></Nav>
                <Wapper></Wapper>
        <router-view></router-view>
    </div>
</template>

<script>
    import Nav from "@/newView/Nav";
    import Wapper from "@/newView/Wapper";

    export default {
        name: "Home",
        components: {Wapper, Nav},
    }
</script>

<style scoped>

</style>
