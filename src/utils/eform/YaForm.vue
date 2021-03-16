<template>
      <el-form  :inline="options.inlineStatus"  :model="options.ruleForm" :rules="rules" :label-width="options.labelWidth" ref="ruleForm" class="demo-ruleForm yaForm-template-class">
                    <el-form-item :key="index" v-for="(item,index) in options.columns" :label="item.label"  :prop="item.prop">
                   <template>
                        <el-input v-if="item.type==='input'" v-model="options.ruleForm[item.field]" :placeholder="item.desc"></el-input>
                        <el-select v-if="item.type==='select'" v-model="options.ruleForm[item.field]" :placeholder="item.desc">
                        <el-option
                        v-for="item2 in item.dic"
                        :key="item2.value"
                        :label="item2.label"
                        :value="item2.value">
                        </el-option>
                        </el-select>
                   </template>
                </el-form-item>
          <slot></slot>
    </el-form>
</template>  
<script lang="ts">
import Vue from 'vue'
import {Component,Watch,Prop} from 'vue-property-decorator'

@Component({})
export default class YaForm extends Vue{
    @Prop({})
    private options

      
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
<style lang="scss">
 .yaForm-template-class{
     .el-select{
         width:100%;
     }
 }   
</style>