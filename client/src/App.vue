<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: 'app',
  components:{},
  created(){
    if(localStorage.getItem("eleToken")){
      const decoded_token = jwt_decode(localStorage.getItem("eleToken"));
      // 存储到vuex
      this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded_token));
      this.$store.dispatch("setUser",decoded_token);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
}
</script>

<style>
html,body,#app{
  width: 100%;
  height: 100%;
}
</style>
