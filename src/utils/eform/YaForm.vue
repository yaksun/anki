<template>
      <el-form  :inline="options.inlineStatus"  :model="options.ruleForm" :rules="rules" :label-width="options.labelWidth" ref="ruleForm" class="demo-ruleForm yaForm-template-class">
                    <el-form-item :key="index" v-for="(item,index) in options.columns" :label="item.label"  :prop="item.prop">
                   <template>
                        <ya-input v-if="item.type==='input'" :item="item"  @handleChange="handleChange(arguments)"></ya-input>
                        <ya-select v-if="item.type==='select'" :item="item"   @handleChange="handleChange(arguments)"></ya-select>
                   </template>
                </el-form-item>
          <slot></slot>
    </el-form>
</template>  
<script lang="ts">
import Vue from 'vue'
import {Component,Watch,Prop} from 'vue-property-decorator'

import YaInput from '@/utils/eform/YaInput.vue'
import YaSelect from '@/utils/eform/YaSelect.vue'
@Component({
    components:{
        YaInput,
        YaSelect
    }
})
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

    handleChange(val){
       
        this.options.ruleForm[val[1]] = val[0]
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