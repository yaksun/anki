<template>
    <div class="yaTable-template-class">
        <el-table
        :row-key="row_key"
        :expand-row-keys="expandRowKeys"
        :data="tableData.data"
        :row-class-name="rowClassName" 
        @row-click="handleClick"
        border
        >
         <el-table-column type="expand">
        <template slot-scope="props">
            <div class="img-warpper">
                 <el-image 
                v-for="(item,index) in props.row.cate.thumb_path"
                :key="index"
                style=" height: 200px"
                :src="props.row.cate.thumb_path[index]" 
                :preview-src-list="props.row.cate.img_path">
            </el-image>
            </div>
        </template>
     </el-table-column>
        <el-table-column
        v-for="(item,index) in newColumns"
        align="center"
        :key="index"
        :prop="item.field"
        :label="item.label"
        :width="item.width">
       
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
<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'

import YaInput from '@/utils/eform/YaInput.vue'
import YaDate from '@/utils/eform/YaDate.vue'
import YaSelect from '@/utils/eform/YaSelect.vue'
@Component({
    components:{
        YaInput ,
        YaDate,
        YaSelect
    }
})
export default class HomeTable extends Vue{
    @Prop({})
    private tableData

   @Prop({})
   private options

    currentPage= 4
    currentIndex=0
    expandRowKeys:any=[]

    rowClassName({row, rowIndex}) {       
          //把每一行的索引放进row        
           row.index = rowIndex;
    }

   
     handleChange(val){
        this.tableData.data[this.currentIndex][val[1]] = val[0]
    }

    handleClick(row, column, event){
       
       this.currentIndex = row.index;
       let id:any = this.tableData.data[this.currentIndex].id 
          if(this.expandRowKeys.indexOf(id)===-1){
              this.expandRowKeys=[]
             this.expandRowKeys.push(id)
          }else{
              this.expandRowKeys=[]
          }
      
    }
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      }
      handleCurrentChange(val) {
        this.$emit('changeCurrent',val)
      }

      row_key(row){
          return row.id
      }

      get newColumns(){
          let temp = this.options.columns.filter(item=>!item.hidden)
          return temp 
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

@mixin scroll-style2{
    &::-webkit-scrollbar {
          height: 20px;
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
    height: calc(100vh - 82px);
    .el-table{
        height: calc(100% - 40px);
        margin-bottom:4px;
        .img-warpper{
            height: 300px;
            display: flex;
            flex-wrap:nowrap;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            overflow: auto;
             @include scroll-style2;
            .el-image{
                width: 23%;
                flex-shrink: 0;
                padding: 20px;
            }
        }
        .el-table__row{
            cursor: pointer;
        }
    }
    .el-table td,.el-table th{
        padding: 0;
    }
    .el-table__body-wrapper{
        height: calc(100% - 48px );
        overflow-y: auto;
         @include scroll-style;
    }
     .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    
}
</style>