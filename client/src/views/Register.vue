<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">后台管理系统</span>
            </div>
            <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="100px" class="registerForm">
              <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="registerUser.name" autocomplete="off" required="required" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="registerUser.email" autocomplete="off" required="required" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerUser.password" autocomplete="off" required="required" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="password2">
                <el-input type="password" v-model="registerUser.password2" autocomplete="off" required="required" placeholder="请确认密码"></el-input>
              </el-form-item>
              <el-form-item label="身份" prop="identity">
                <el-select v-model="registerUser.identity" placeholder="请选择身份">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                <el-button @click="resetForm('registerForm')">重置</el-button>
              </el-form-item>
              <div class="backLogin">
                <router-link to="/login" tag="a">返回登录</router-link>
              </div>
            </el-form>
        </section>
    </div>
</template>
<script>
export default {
    name:"register",
    components:{},
    data() {
      var validatePass = (rule, value, callback) => {
        if (value !== this.registerUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerUser: {
          name:'',
          email:'',
          password: '',
          password2: '',
          identity:''
        },
        options: [{
          value: 'user',
          label: '用户'
        }, {
          value: 'admin',
          label: '管理员'
        }],
        value: '',
        rules: {
          name:[
            {required:'true',message:'用户名不能为空',trigger:'blur'},
            {min:2,max:20,message:'用户名长度应为2~20个字符',trigger:'blur'}
          ],
          email:[
            {required:'true',message:'邮箱不能为空',trigger:'blur'},
            {type:'email',message:'格式不正确',trigger:'blur'}
          ],
          password: [
            {required:'true',message:'密码不能为空',trigger:'blur'},
            {min:6,max:20,message:'密码长度应为6~20个字符',trigger:'blur'}
          ],
          password2: [
            {required:'true',message:'确认密码不能为空',trigger:'blur'},
            { validator: validatePass, trigger: 'blur' }
          ],
          identity: [
            {required:'true',message:'身份不能为空',trigger:'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/api/users/register",this.registerUser)
                       .then(res => {
                        if(res){
                          this.$message({
                            message:"注册成功!",
                            type:"success"
                          })
                          this.$router.push("/login");
                         }
                       })
          } else {
            alert('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped>
.register {
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
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.backLogin{
  text-align: right;
  font-size: 12px;
  color: #000;
}
</style>