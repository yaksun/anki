<template>
   <div class="autoTable-template-class">
     <el-button class="add-btn" @click="handleAdd">添加</el-button>
      <ya-table 
    :tableData="tableData"
    :options="options"
    ></ya-table>
    <YaDialog />
   </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {PubSub} from 'pubsub-js'

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
          date: '2016-05-03',
          name: '王小虎',
          status:"0",
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          status:"1",
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          status:"0",
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          status:"1",
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          status:"0",
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
            status:"0",
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
            status:"1",
          address: '上海市普陀区金沙江路 1518 弄'
        }]

    options={
        columns:[
            {label:'日期',prop:'date',width:'180',extra:{type:'date',option:{ desc:'输入日期',field:'date',clearable:true}}},
            {label:'姓名',prop:'name',width:'180',extra:{type:'input',option:{ desc:'请输入地址',field:'name',clearable:true}}},
            {label:'状态',prop:'status',width:'180',extra:{type:'select',option:{desc:'选择状态',field:'status',dic:[{label:'开启',value:'0'},{label:'关闭',value:'1'}]}}},
            {label:'地址',prop:'address',extra:{type:'input',option:{ desc:'请输入地址',field:'address',clearable:true}}}
        ]
    }

    handleAdd(){
      PubSub.publish('showDialog')
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
}
 
</style>