<template>
   <div class="autoTable-template-class">
     <el-button class="add-btn" @click="handleAdd">添加</el-button>
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
    <YaDialog 
     v-if="isShowDialog"
    :isShowDialog="isShowDialog"
    :options="options"
     :val="val" 
       @close="closeDialog"
     />
   </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

import YaTable from '@/utils/etable/YaTable.vue'
import YaDialog from '@/utils/edialog/YaDialog.vue'

@Component({
    components:{
        YaTable,
        YaDialog
    }
})
export default class AutoTable extends Vue{
     tableData= [{
          date: '2016-05-17',
          name: '王小虎1',
          status:"0",
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎2',
          status:"1",
          address: '上海市普陀区金沙江路 1518 弄'
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
        }, {
          date: '2016-05-07',
          name: '王小虎7',
            status:"1",
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

        private val={}

        private isShowDialog:boolean=false


    handleAdd(){
     
    }

  // 查看详情
    handleDetailClick(row){
      // 指定操作类型
      
      let temp = Object.assign({},row)
      temp.oper="detail" 
      this.val = temp 
      this.isShowDialog = true 
      
    }

    // 修改界面
    handleUpdateClick(val){

    }

    // 删除操作
    handleDeleteClick(val){

    }

    // 重置数据
    closeDialog(){
      this.isShowDialog = false
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