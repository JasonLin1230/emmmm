<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">后台管理系统</span>
            </div>
            <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="100px" class="loginForm">
              <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="loginUser.email" autocomplete="off" required="required" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginUser.password" autocomplete="off" required="required" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
              </el-form-item>
              <div class="toRegister">
                  <p>还没有账号？<router-link to="/register">立即注册</router-link></p>
              </div>
            </el-form>
        </section>
    </div>
</template>
<script>
import jwt_decode from "jwt-decode";
export default {
    name:"register",
    components:{},
    data() {
      return {
        loginUser: {
          email:'',
          password: ''
        },
        rules: {
          email:[
            {required:'true',message:'邮箱不能为空',trigger:'blur'},
            {type:'email',message:'格式不正确',trigger:'blur'}
          ],
          pass: [
            {required:'true',message:'密码不能为空',trigger:'blur'},
            {min:6,max:20,message:'密码长度应为6~20个字符',trigger:'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/api/users/login",this.loginUser)
                       .then(res => {
                           if(res){
                            // token解构
                            const { token } = res.data;
                            // 使用localStorage存储
                            localStorage.setItem("eleToken",token);

                            // 解析token
                            const decoded_token= jwt_decode(token);
                            // 存储到vuex
                            this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded_token));
                            this.$store.dispatch("setUser",decoded_token);

                            this.$router.push("/index");
                           }
                       })
          } else {
            alert('error submit!!');
            return false;
          }
        });
      },
      isEmpty(value) {
        return (
          value === undefined ||
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
        );
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped>
.login{
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 38%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.toRegister{
    text-align: right;
    font-size: 12px;
}
</style>