<template>
      <el-form :inline="options.inlineStatus"  :model="options.ruleForm" :rules="rules" :label-width="options.labelWidth" ref="ruleForm" class="demo-ruleForm">
                <el-form-item :key="index" v-for="(item,index) in options.columns" :label="item.label" :prop="item.prop">
                    <el-input v-model="options.ruleForm[item.prop]" :placeholder="item.desc"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button  type="primary" @click="onSubmit" :disabled="options.initStatus">登录</el-button>
                    <el-button  type="primary" @click="onCancel" :disabled="options.initStatus">取消</el-button>
                </el-form-item>
    </el-form>
</template>  
<script lang="ts">
import Vue from 'vue'
import {Component,Watch} from 'vue-property-decorator'

@Component({})
export default class YaForm extends Vue{


        options={
            inlineStatus:true,
            labelWidth:'80px',
            ruleForm:{
                username:"",
                password:""
            },
            columns:[
                {label:'用户名',prop:'username',desc:'请输入姓名'},
                {label:'密码',prop:'password',desc:'请输入身份证号'}
            ],
            initStatus:true
           
        }

        rules={} 

        created() {
            this.getRules()
        }

        getRules(){
            let obj={} 
            this.options.columns.forEach(item=>{
                let fn =   (rule, value, callback) => {
                                    if (value === '') {
                                    callback(new Error(item.desc));
                                    } else {
                                    
                                    callback();
                                    }
                                }
                    if(item.prop){
                        obj[item.prop] = [
                             { required: true, validator: fn, trigger: 'blur' }
                        ]
                    }
            })

           this.rules = obj 
        }
     
     
    onSubmit(){
        console.log(this.options.ruleForm);
    }

    onCancel(){
        this.options.ruleForm={
             username:'',
             password:''
        }
    }

    @Watch("options.ruleForm", {immediate: true, deep: true})
    handleDisabled(val){
        let arr:any=[]
        this.options.columns.forEach(item=>{
                if(item.prop){
                    arr.push(item.prop)
                }
            })
       
        let flag = true   
        for(let key in val){
            if(arr.indexOf(key)!=-1  &&  !val[key]){
                flag=false
            }
        }

        this.options.initStatus = flag ?  false : true  
    }

}
</script>  
<style lang="">
    
</style>