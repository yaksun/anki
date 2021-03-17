<template>
   <div class="autoTable-template-class">
     <ya-form :options="options2" :params="val">
       <el-button type="info" @click="handleSearch">搜索</el-button>
      <el-button  @click="handleAdd">添加</el-button>
     </ya-form>
      <ya-table 
    :tableData="tableData"
    :options="options"
    >
         <el-table-column align="center"
                         width="180"
                         label="操作">
          <template slot-scope="scope">
            <el-button plain
                       circle
                       size="mini"
                       type="primary"
                       icon="el-icon-document"
                       @click="handleDetailClick(scope.row)"></el-button>
            <el-button plain
                       circle
                       size="mini"
                       type="primary"
                       icon="el-icon-edit"
                       @click="handleUpdateClick(scope.row)"></el-button>
            <el-button plain
                       circle
                       size="mini"
                       type="danger"
                       icon="el-icon-delete"
                       @click="handleDeleteClick(scope.row)"></el-button>
          </template>
      </el-table-column>
    </ya-table>
    <ya-dialog 
     v-if="isShowDialog"
    :isShowDialog="isShowDialog"
    :options="options"
     :val="val" 
       @close="closeDialog"/>
   </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

import YaTable from '@/utils/etable/YaTable.vue'
import YaDialog from '@/utils/edialog/YaDialog.vue'
import YaForm from '@/utils/eform/YaForm.vue'

@Component({
    components:{
        YaTable,
        YaDialog,
        YaForm
    }
})
export default class AutoTable extends Vue{
     tableData= [ {
          date: '2016-05-02',
          name: '王小虎2',
          status:"1",
          address: '上海市普陀区金沙江路 1518 111弄'
        }, {
          date: '2016-05-04',
          name: '王小虎3',
          status:"0",
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎4',
          status:"1",
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎5',
          status:"0",
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎6',
            status:"0",
          address: '上海市普陀区金沙江路 1518 弄'
        }]


      private options={
            inlineStatus:false,
            labelWidth:'80px',
            ruleForm:{},
            columns:[
                // 当为必选时要加prop
                //  表头和表单共用配置
                {label:'日期',field:'date',prop:'date',width:'240',desc:'输入日期',type:'date',clearable:true},
                {label:'姓名',field:'name',prop:'name',width:'180',desc:'请输入姓名',type:'input'},
                {label:'状态',field:'status',prop:'status',width:'180',desc:'请选择状态',type:'select',dic:[{label:'开启',value:'0'},{label:'关闭',value:'1'}]},
                {label:'地址',field:'address',prop:'address',desc:'请选择地址',type:'input'},
            ],
            initStatus:true
           
        }

      // 头部横向表单配置
        private options2={
            inlineStatus:true,
            labelWidth:'80px',
            ruleForm:{},
            columns:[
                {label:'日期',field:'date',prop:'date',width:'240',desc:'输入日期',type:'date',clearable:true},
                {label:'姓名',field:'name',prop:'name',width:'180',desc:'请输入姓名',type:'input'},
                {label:'状态',field:'status',prop:'status',width:'180',desc:'请选择状态',type:'select',dic:[{label:'开启',value:'0'},{label:'关闭',value:'1'}]},
                {label:'地址',field:'address',prop:'address',desc:'请选择地址',type:'input'},
            ],
            initStatus:true
           
        }


        private val={}
        private isShowDialog:boolean=false


    handleAdd(){
      let temp={title:'添加数据'}
      this.val = temp 
      this.isShowDialog = true 

    }


       // 查看详情
    handleDetailClick(row){
       
      // 指定操作类型
      let temp = Object.assign({},row)
      temp.title="查看详情" 
      temp.oper='detail'
      this.val = temp 
      this.options.columns =  this.options.columns.map(item=>{
        return {
          ...item,
         disabled:true
        }
      })
      this.isShowDialog = true 
      
    }

    // 修改界面
    handleUpdateClick(row){
      let temp = Object.assign({},row)
      temp.title="修改数据" 
      temp.oper='update'
      this.val = temp 
       this.options.columns =  this.options.columns.map(item=>{
        return {
          ...item,
         disabled:false
        }
      })
      this.isShowDialog = true 
    }

    // 删除操作
    handleDeleteClick(val){
         this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let params = Object.assign({},{id:val.id})
          // const res = await this.bll.delApi(params)
          const res={code:200}
          if(res.code===200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //  this.getList()
          }else{
              this.$message({
              type: 'info',
              message: '删除失败'
            });      
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }

    // 搜索操作
    handleSearch(){

    }

    // 重置数据
    closeDialog(){
      this.isShowDialog = false
      this.val={}
    }
}
</script>
<style lang="scss">
.autoTable-template-class{
   .add-btn {
    position: absolute;
    z-index: 10;
    right: 10px;
    top: 2px
   }
   .el-dialog{
     width: 80%  !important;
   }
   
}
 
</style>