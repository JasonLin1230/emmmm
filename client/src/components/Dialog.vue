<template>
    <el-dialog title="添加资金信息"
        :visible.sync="dialog.show"
        close-on-click-modal=true
        modal-append-to-body=false>
        <el-form :model="form" :rules="rules">
            <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-select v-model="form.type" placeholder="请选择类型">
                    <el-option v-for="(formType,index) in format_type_list" :key="index" :label="formType" :value="formType"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收支描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" autocomplete="off"></el-input>    
            </el-form-item>
            <el-form-item label="收入" :label-width="formLabelWidth">
                <el-input v-model="form.income" autocomplete="off"></el-input>    
            </el-form-item>
            <el-form-item label="支出" :label-width="formLabelWidth">
                <el-input v-model="form.expend" autocomplete="off"></el-input>    
            </el-form-item>
            <el-form-item label="账户现金" :label-width="formLabelWidth">
                <el-input v-model="form.cash" autocomplete="off"></el-input>    
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="form.remark" autocomplete="off"></el-input>    
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name:"dialog",
    props:{
        dialog:Object
    },
    data(){
        return{
            form: {
                type: '',
                income: '',
                expend: '',
                description: '',
                remark: '',
                cash: '',
                id: ''
            },
            format_type_list:[
                "提现","充值","转账","优惠券"
            ],
            formLabelWidth: '120px',
            rules: {
                type:[
                    {required:'true',message:'类型不能为空',trigger:'blur'}
                ],
                income:[
                    {required:'true',message:'收入不能为空',trigger:'blur'}
                ],
                expend: [
                    {required:'true',message:'支出不能为空',trigger:'blur'}
                ],
                cash: [
                    {required:'true',message:'现金不能为空',trigger:'blur'}
                ],
                description: [
                    {required:'true',message:'描述不能为空',trigger:'blur'}
                ]
            }
        }
    },
    method:{
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/api/profiles/add",this.form)
                       .then(res => {
                        if(res){
                          this.$message({
                            message:"添加成功!",
                            type:"success"
                          })
                          this.dialog.show=false;
                          this.emit("update");
                         }
                       })
          } else {
            alert('error submit!!');
            return false;
          }
        });
      },
    }
}
</script>
