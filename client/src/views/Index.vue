<template>
    <div class="index">
        <header-nav>

        </header-nav>
        <left-menu>

        </left-menu>
        <router-view class="index-container">

        </router-view>
    </div>
</template>
<script>
import myHeader from "../components/Header"
import leftMenu from "../components/LeftMenu"
export default {
    name:"index",
    components:{
        "header-nav":myHeader,
        "left-menu":leftMenu
    }
}
</script>
<style scoped>
.index{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.index-container{
    position: absolute;
    left: 180px;
    top: 59px;
    width: calc(100% - 180px);
    height: calc(100% - 71px);
    overflow: auto;
}
</style>

