<template>
  <div>
    <el-input 
    v-model="value" 
    :id="item.field"
    :type="item.type"
    :autosize="item.autosize"
    :placeholder="item.desc" 
    :disabled="item.disabled"
    :clearable="item.clearable"
    :show-password="item.showPassword"
    >
    </el-input>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop,Watch} from 'vue-property-decorator'

@Component({})
export default class YaInput extends Vue{
     @Prop({})
    private item:any

     @Prop({})
    private val

    
    value="" 
    url=['https://www.baidu.com/img/flexible/logo/pc/result.png']

    created(){
        this.value = this.val
        
    }


      mounted(){
        
     }

   


    @Watch('value')
    handleChange(val): void{
        this.$emit('handleChange',val,this.item.field)
    }
}
</script>