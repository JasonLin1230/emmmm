import Vue from 'vue'
import VueRouter from "vue-router"
import Register from "./views/Register"
import Login from "./views/Login"
import Index from "./views/Index"
import NotFound from "./views/404"
import { Message } from "element-ui";


const routes=[
    {
        path:'*',name:"404",component:NotFound
    },
    {
        path:'/register',name:"register",component:Register
    },
    {
        path:"/login",name:"login",component:Login
    },
    {
        path:"/index",name:"index",component:Index
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
router.beforeEach((to,from,next) => {
  const isLogin = (localStorage.getItem("eleToken") ? true : false);
  if(to.path == '/login' || to.path == '/regitser'){
    next();
  }else{
    if(isLogin){
      next();
    }else{
      next('/login');
      Message({
        message:"您尚未登陆，请先登录",
        type:"warning"
      });
    }
  }
})

export default router;