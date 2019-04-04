import Vue from 'vue'
import VueRouter from "vue-router"
import Register from "./views/Register"
import Login from "./views/Login"


const routes=[
    {
        path:'/register',name:"register",component:Register
    },
    {
        path:"/login",name:"login",component:Login
    }
];

Vue.use(VueRouter);

const router=new VueRouter({
    routes,
    mode:"history",
    base:process.env.BASE_URL,
    scrollBehavior(to,from,savedPosition) {
      if(savedPosition){
        return savedPosition;
      }else{
        return {x:0,y:0};
      }
    }
});

export default router;