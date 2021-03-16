<template>
    <ya-table 
    :tableData="tableData"
    :options="options"
    ></ya-table>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

import YaTable from '@/utils/etable/YaTable.vue'

@Component({
    components:{
        YaTable
    }
})
export default class AutoTable extends Vue{
     tableData= [{
          date: '2016-05-03',
          name: '王小虎',
          status:0,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          status:1,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          status:1,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          status:1,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          status:0,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
            status:1,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
            status:0,
          address: '上海市普陀区金沙江路 1518 弄'
        }]

    options={
        columns:[
            {label:'日期',prop:'date',width:'180',extra:{type:'date',option:{ desc:'输入日期',field:'date',clearable:true}}},
            {label:'姓名',prop:'name',width:'180',extra:{type:'input',option:{ desc:'请输入地址',field:'date',clearable:true}}},
            {label:'状态',prop:'status',width:'180',extra:{}},
            {label:'地址',prop:'address',extra:{type:'input',option:{ desc:'请输入地址',field:'date',clearable:true}}}
        ]
    }
}
</script>