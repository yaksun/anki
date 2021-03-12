<template>
    <div>
        <ya-form>
            
        </ya-form>
    </div>
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
}
</script>
<style lang="">
    
</style>