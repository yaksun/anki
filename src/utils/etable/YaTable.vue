<template>
    <div class="yaTable-template-class">
        <el-table
        :data="tableData"
        :row-class-name="rowClassName" 
        @row-click="handleClick"
        border
        >
        <el-table-column
        v-for="(item,index) in options.columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width">
             <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
               <ya-input  v-if="item.extra.type==='input'" :item="item.extra.option" :val="scope.row[item.prop]"  @handleChange="handleChange(arguments)" ></ya-input>
                <ya-date v-if="item.extra.type==='date'" :item="item.extra.option" :val="scope.row[item.prop]"  @handleChange="handleChange(arguments)"></ya-date>
                <div v-if="!item.extra.type">{{scope.row[item.prop]}}</div>
            </div>
            </template>
             
        </el-table-column>
       
    </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'

import YaInput from '@/utils/eform/YaInput.vue'
import YaDate from '@/utils/eform/YaDate.vue'
@Component({
    components:{
        YaInput ,
        YaDate
    }
})
export default class YaTable extends Vue{
    @Prop({})
    private tableData

   @Prop({})
   private options

    currentPage= 4
    currentIndex=0
    rowClassName({row, rowIndex}) {       
          //把每一行的索引放进row        
           row.index = rowIndex;
    }

     handleChange(val){
        this.tableData[this.currentIndex][val[1]] = val[0]
    }

    handleClick(row){
       this.currentIndex = row.index
    }
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      }
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
}
</script>
<style  lang="scss">
@mixin scroll-style{
    &::-webkit-scrollbar {
          width: 4px;
    }
      &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
      }  
      &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);
      }
}
.yaTable-template-class{
    height: calc(100vh - 40px);
    .el-table{
        height: calc(100% - 40px);
        margin-bottom:4px;
    }
    .el-table td{
        padding: 0;
    }
    .el-table__body-wrapper{
        height: calc(100% - 48px );
        overflow: auto;
         @include scroll-style;
    }
}
</style>