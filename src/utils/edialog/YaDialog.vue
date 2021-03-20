<template>
    <el-dialog
    :title="val.title"
    :visible.sync="dialogVisible"
    :before-close="handleInit"
    width="30%"
  >
     <ya-form :options="options" :params="val">
          <el-form-item class="oper-btn">
                    <el-button v-show="val.oper!='detail'" type="primary" @click="onSubmit" :disabled="options.initStatus">提交</el-button>
                    <el-button  type="primary" @click="onCancel" >取消</el-button>
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
    private title=''

    itemInfo={}
  
    created(){
        let temp={} 
        this.options.columns.forEach(item=>{
                temp[item.field]=''
        })
        this.options.ruleForm = temp
         if(this.val.type==='detail'){
            this.title='详情'
        }

        this.dialogVisible = this.isShowDialog
    }

        onSubmit(){
          this.$emit('handleSubmit',this.options.ruleForm)  
         }

        onCancel(){
            this.options.ruleForm={}
            this.handleInit()
        }

    // 关闭前清空数据
    handleInit(){
       this.$emit('close')
    }

    
  
}
</script>