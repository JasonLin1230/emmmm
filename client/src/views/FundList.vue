<template>
    <div class="fillContainer">
        <div>
            <el-form :inline="true" ref="add_data" v-model="date">
                <el-form-item label="按时间筛选：">
                    <el-date-picker
                        v-model="date.dateTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="handleSearch()">筛选</el-button>
                </el-form-item>
                <el-form-item class="right">
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
                        <span style="margin-left: 10px">{{new Date(Number(scope.row.date)).toLocaleString()}}</span>
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
        <div class="block right page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pagination.current_page"
                :page-sizes="pagination.page_sizes"
                :page-size="pagination.page_size"
                :layout="pagination.layout"
                :total="pagination.total">
            </el-pagination>
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
            date:{
                dateTime:[]
            },
            tableData:[],
            allTableData:[],
            filterData:[],
            pagination:{
                current_page: 1,
                page_sizes: [10, 20, 30, 50],
                page_size: 10,
                layout: "total, sizes, prev, pager, next, jumper",
                total: 0
            },
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
                this.allTableData=res.data;
                this.filterData=res.data;
                this.setPagination();
            }).catch(err => {
                alert(err);
            })
        },
        setPagination(){
            this.pagination.total = this.allTableData.length;
            this.pagination.current_page = 1;
            this.pagination.page_size = 10;
            this.tableData = this.allTableData.filter((item,index) => {
                return index < this.pagination.page_size
            })
        },
        handleSearch(){
            if(!this.date.dateTime || !this.date.dateTime.length){
                this.$message({
                    type:"warning",
                    message:"请选择时间区间"
                })
                this.getProfile();
                return;
            }
            const sTime = this.date.dateTime[0].getTime();
            const eTime = this.date.dateTime[1].getTime();
            this.allTableData = this.filterData.filter((item) => {
                let time = Number(item.date);
                return time >= sTime  && time <= eTime;
            })
            this.setPagination();
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
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pagination.current_page = 1;
            this.pagination.page_size = val;
            this.tableData = this.allTableData.filter((item,index) => {
                return index < val
            })
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            let start = this.pagination.page_size * (val-1);
            let end = this.pagination.page_size * val;
            let tables = [];
            for(let i=start;i<end;i++){
                if(this.allTableData[i]){
                    tables.push(this.allTableData[i]);
                }
            }
            this.tableData = tables;
        }
    }
}
</script>
<style scoped>
.fillContainer{
    /* width:100%; */
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
}
.right{
    float: right;
}
.page{
    margin-top: 20px;
}
</style>
