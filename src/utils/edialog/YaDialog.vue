<template>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    :before-close="handleInit"
    width="30%"
  >
     <ya-form :options="options" :params="itemInfo">
          <el-form-item class="oper-btn">
                    <el-button  type="primary" @click="onSubmit" :disabled="options.initStatus">提交</el-button>
                    <el-button  type="primary" @click="onCancel" :disabled="options.initStatus">取消</el-button>
             </el-form-item>
     </ya-form>
    </el-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop,Watch} from 'vue-property-decorator'

import YaForm from '@/utils/eform/YaForm.vue'

@Component({
    components:{
        YaForm
    }
})
export default class YaDialog extends Vue{
    @Prop({})
    private options

      @Prop({})
    private val

    @Prop({})
    private isShowDialog

    private dialogVisible=false
    itemInfo={}
  
    created(){
      
        let temp={} 
        this.options.columns.forEach(item=>{
                temp[item.field]=''
        })
        this.options.ruleForm = temp

            for(let key in this.val){
              this.itemInfo[key] = this.val[key]
            }
          
            this.dialogVisible = this.isShowDialog
    }

        onSubmit(){
            console.log(this.options.ruleForm);
         }

        onCancel(){
            this.options.ruleForm={}
        }

    // 关闭前清空数据
    handleInit(){
       this.$emit('close')
    }

    @Watch('val')
    handleShow(value){
        // if(value.oper){
        //     this.dialogVisible = true
        // }
    }
  
}
</script>