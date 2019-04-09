<template>
    <el-header class="header">
        <el-row>
            <el-col :span="12" class="logo-container">
                <img src="../assets/logo.png" alt="LOGO" class="logo">
                <span class="title">Athena后台管理系统</span>
            </el-col>
            <el-col :span="12" class="info-container">
                <el-dropdown trigger="hover" @command="handleCommand">
                    <img :src="user.avatar" alt="avatar" class="avatar">
                    <span class="el-dropdown-link name">
                        {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="showInfo">个人信息</el-dropdown-item>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
export default {
    name:'myHeader',
    computed:{
        user(){
            return this.$store.getters.user;
        }
    },
    components:{},
    methods:{
        handleCommand(command) {
            switch (command){
                case "showInfo":
                    this.showInfo();
                    break;
                case "logout":
                    this.logout();
                    break;
                default:
                    break;
            }
        },
        showInfo(){
            this.$router.push("/info")
        },
        logout(){
            // 清除token
            localStorage.removeItem("eleToken");
            this.$store.dispatch("clearCurrentState");

            // 页面跳转
            this.$router.push("/login");
        }
    }
}
</script>

<style scoped>
.header{
    width: 100%;
    min-width: 600px;
    height: 60px;
    padding: 5px 10px;
    background: #324057;
    color: #fff;
    border-bottom: 1px solid #1f2d3d;
}
.logo{
    width: 50px;
    height: 50px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: middle;
}
.title{
    color: #fff;
    font-size: 22px;
    letter-spacing: 3px;
    vertical-align: middle;
}
.info-container{
    text-align: right;
    padding: 5px;
}
.avatar{
    width: 40px;
    height: 40px;
    margin-right: 5px;
    border-radius:50%;
    vertical-align: middle;
}
.name{
    color: #fff;
    font-size: 18px;
    vertical-align: middle;
}
</style>
