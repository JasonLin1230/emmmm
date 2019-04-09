<template>
    <div class="index">
        <header-nav>

        </header-nav>
        <router-view>

        </router-view>
    </div>
</template>
<script>
import myHeader from "../components/Header"
export default {
    name:"index",
    components:{
        "header-nav":myHeader
    }
}
</script>
<style scoped>
.index{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>

