<template>
        <el-dialog
            :title="status ? '修改卡片': '添加卡片' "
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
  
</template>
<script lang="ts">
import Vue from 'vue' 
import {Component,Prop,Watch} from 'vue-property-decorator'
import {HomeServices} from '@/bll/home/HomeServices'
import {State,Mutation} from 'vuex-class'

@Component({})
export default class CardModal extends Vue{
    @State('cateList') cateList:any 
    @Mutation('ADDCARD') add_card:any 
    @Mutation('UPDCARD') upd_card:any 
    @Prop(Object)
    item
 
    centerDialogVisible=false 
    status=false 

    form={
        title:'',
        content:'',
        cateId:''
    }

     formLabelWidth='50px'
      homeServices = new HomeServices()


       // 添加卡片
    async handleAddItem(){
       if(!this.status){
            let params ={
            ...this.form,
            leavel:0,
            nextShowTime:new Date().getTime() 
        }
        const res = await  this.homeServices.addCard(params)
        if(res){
                this.handleCancel() 
                this.add_card(params)
        }
       }else{
             let params = this.form
             const res = await  this.homeServices.updCard(params)
             if(res){
                this.handleCancel() 
                this.upd_card(params)
            }
       }
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

    @Watch('item')
    handleEdit(val){
       this.status=true  
       this.form={
           ...val
       }
    }
    
}
</script>
<style lang="scss">
    
</style>