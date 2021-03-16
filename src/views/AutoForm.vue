<template>
        <ya-form :options="options" class="autoForm-template-class">
             <el-form-item class="oper-btn">
                    <el-button  type="primary" @click="onSubmit" :disabled="options.initStatus">登录</el-button>
                    <el-button  type="primary" @click="onCancel" :disabled="options.initStatus">取消</el-button>
             </el-form-item>
        </ya-form>
</template>
<script lang="ts"> 
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

import YaForm from '@/utils/eform/YaForm.vue'
@Component({
    components:{
        YaForm
    }
})
export default class AutoForm extends Vue{
        private options={
            inlineStatus:false,
            labelWidth:'80px',
            ruleForm:{},
            columns:[
                // 当为必选时要加prop
                {label:'用户名',field:'username',prop:'username',desc:'请输入姓名',type:'input'},
                {label:'密码',field:'password',prop:'password',desc:'请输入身份证号',type:'input'},
                {label:'性别',field:'sex',prop:'sex',desc:'请选择性别',type:'select',dic:[{label:'女',value:'女'},{label:'男',value:'男'}]},
            ],
            initStatus:true
           
        }

        created(){
            let temp={} 
            this.options.columns.forEach(item=>{
                temp[item.field]=''
            })
            this.options.ruleForm = temp
        }

        onSubmit(){
            console.log(this.options.ruleForm);
         }

        onCancel(){
            this.options.ruleForm={}
        }
}
</script>
<style lang="scss">
   .autoForm-template-class{
       .oper-btn{
           text-align: center;
       }
   } 
</style>