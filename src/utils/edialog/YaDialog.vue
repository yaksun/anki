<template>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
  >
     <ya-form :options="options">
          <el-form-item class="oper-btn">
                    <el-button  type="primary" @click="onSubmit" :disabled="options.initStatus">提交</el-button>
                    <el-button  type="primary" @click="onCancel" :disabled="options.initStatus">取消</el-button>
             </el-form-item>
     </ya-form>
    </el-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {PubSub} from 'pubsub-js'

import YaForm from '@/utils/eform/YaForm.vue'

@Component({
    components:{
        YaForm
    }
})
export default class YaDialog extends Vue{

    private dialogVisible=false

     private options={
            inlineStatus:false,
            labelWidth:'80px',
            ruleForm:{},
            columns:[
                // 当为必选时要加prop
                {label:'用户名',field:'username',prop:'username',desc:'请输入姓名',type:'input',clearable:true},
                {label:'密码',field:'password',prop:'password',desc:'请输入身份证号',type:'input',showPassword:true},
                {label:'性别',field:'sex',prop:'sex',desc:'请选择性别',type:'select',disabled:false,filterable:true,allowCreate:true,multiple:true,dic:[{label:'女',value:'女'},{label:'男',value:'男'}]},
                {label:'日期',field:'date',prop:'date',desc:'请选择日期',type:'date'},
                {label:'上传头像',field:'avatar',prop:'avatar',type:'upload',url:'http://www.baidu.com',initVal:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'}
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


    mounted(){
        PubSub.subscribe('showDialog',()=>{
            this.dialogVisible = true 
        })
    }
}
</script>