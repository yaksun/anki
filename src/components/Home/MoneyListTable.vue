<template>
    <div class="moneyListTable-template">
      <el-button @click="handleAdd" size='mini'>添加</el-button>
          <el-table
        :data="tableData.data"
        border
        >
        <el-table-column
        v-for="(item,index) in newColumns"
        align="center"
        :key="index"
        :prop="item.field"
        :label="item.label"
        :width="item.width">
            <template slot-scope="props">
            <el-input v-model="props.row[item.field]" @change="handleChangeAuto(props.row,item.field)" @blur="handleSubmitItem"></el-input>
            </template>
        </el-table-column>
      <slot></slot>
    </el-table>
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="tableData.pageSize"
      layout="total, prev, pager, next"
      :total="tableData.total">
    </el-pagination>
    
    </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import { Component,Prop } from 'vue-property-decorator'

@Component({})
export default class MoneyListTable extends Vue{
    @Prop({default:{}})
    tableData

    
   @Prop({default:{}})
   private options


     
     get newColumns(){
          let temp = this.options.columns.filter(item=>!item.hidden)
          return temp 
      }

      handleAdd(){
        // 添加记录
        this.$emit('showDialog')
      }

     handleChangeAuto(){

     } 

     handleSizeChange(){

     }

     handleCurrentChange(){

     }

     handleSubmitItem(){

     }
}
</script>
<style lang='scss'>
.moneyListTable-template{
    height: 100%;
    .el-table{
        height: calc(100% - 40px);
    }
    .el-button{
      float: right;
      margin: 10px 20px 10px 0;
    }
}
</style>
