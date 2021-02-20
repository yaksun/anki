<template>
     <div class="search">
               <div class="search-input">
               <el-input v-model="keyword" >
                     <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
               </el-input>
            </div>
            <div class="add-item">
                <i class="iconfont icon-tianjia" @click="centerDialogVisible = true"></i>
            </div>
              <el-dialog
            title="添加卡片"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
          <el-form :model="form">
            <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input v-model="form.content" autocomplete="off" type="textarea" :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="分类" :label-width="formLabelWidth">
            <el-select v-model="form.cateId" placeholder="请选择分类">
                 <el-option
                    v-for="item in cateList"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                    </el-option>
            </el-select>
            </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleAddItem">确 定</el-button>
            </div>
        </el-dialog>
        </div>
</template>
<script lang="ts">
import Vue from 'vue' 
import {Component} from 'vue-property-decorator'
import {State} from 'vuex-class'

@Component({})
export default class Search extends Vue {
    @State('cateList') cateList:any 

      keyword:String=''
      centerDialogVisible=false

        form={
        title:'',
        content:'',
        cateId:''
    }

     formLabelWidth='50px'

       // 搜索
    handleSearch(){

    }

     // 添加卡片
    handleAddItem(){
        console.log( this.form);
       this.handleCancel() 
    }

    // 取消卡片添加
    handleCancel(){
         this.centerDialogVisible = false
        this.clearItemForm()
    }

    // 清空表单
    clearItemForm(){
        this.form={
             title:'',
            content:'',
            cateId:''
        }
    }
}
</script>
<style lang="scss">
    .search{
         margin: 10px 5px;
         display: flex;
         .search-input{
             flex:1;
         }
         .add-item{
             width: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
         }
     } 
</style>