<template>
    <div class="fillContainer">
        <div>
            <el-form :inline="true" ref="add_data">
                <el-form-item>
                    <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
                v-if="tableData.length > 0"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="序号"
                    align='center'
                    width="70">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="创建时间"
                    align='center'
                    width="250"
                    sortable>
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="收支类型"
                    align='center'
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="收支描述"
                    align='center'
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="income"
                    label="收入"
                    align='center'
                    width="170"> 
                    <template slot-scope="scope">  
                        <span style="color:#00d053">+ {{ scope.row.income }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="expend"
                    label="支出"
                    align='center'
                    width="170">
                    <template slot-scope="scope">  
                        <span style="color:#f56767">- {{ scope.row.expend }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="cash"
                    label="账户现金"
                    align='center'
                    width="170">
                    <template slot-scope="scope">  
                        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>
                    <el-table-column
                    prop="remark"
                    label="备注"
                    align='center'
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="operation" 
                    align="center"
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="small"
                    type="warning"
                    icon="edit"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="small"
                    type="danger"
                    icon="delete"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <my-dialog :dialog="dialog" :form="form" @update="getProfile()"></my-dialog>
    </div>
</template>

<script>
import dialogForm from "../components/Dialog"
export default {
    name:"foudList",
    data(){
        return {
            tableData:[],
            dialog:{
                show:false,
                title:"编辑信息",
                option:"edit"
            },
            form: {
                type: "",
                description: "",
                income: "",
                expend: "",
                cash: "",
                remark: "",
                id: ""
            },
        }
    },
    components:{
        "myDialog":dialogForm
    },
    created(){
        this.getProfile();
    },
    methods:{
        getProfile(){
            this.$axios.get("/api/profiles").then(res => {
                this.tableData=res.data;
            }).catch(err => {
                alert(err);
            })
        },
        handleAdd(){
            this.form = {
                type: "",
                description: "",
                income: "",
                expend: "",
                cash: "",
                remark: "",
                id: ""
            },
            this.dialog = {
                show:true,
                title:"添加信息",
                option:"add"
            }
        },
        handleEdit(index,row){
            // alert(index,row);
            this.form={
                type:row.type,
                description: row.description,
                income: row.income,
                expend: row.expend,
                cash: row.cash,
                remark: row.remark,
                id: row._id
            }
            this.dialog = {
                show:true,
                title:"编辑信息",
                option:"edit"
            }
        },
        handleDelete(index,row){
            // eslint-disable-next-line
            this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
                this.$message("删除成功");
                this.getProfile();
            }).catch(err => {
                alert(err);
            })
        }
    }
}
</script>
<style scoped>
.fillContainer{
    width:100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
}
.right{
    float: right;
}
</style>
