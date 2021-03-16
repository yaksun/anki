<template>
    <el-input 
    v-model="value" 
    :placeholder="item.desc" 
    :disabled="item.disabled"
    :clearable="item.clearable"
    :show-password="item.showPassword"
    ></el-input>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop,Watch} from 'vue-property-decorator'

@Component({})
export default class YaInput extends Vue{
    @Prop({})
    private item
    
    value="" 


    @Watch('value')
    handleChange(val): void{
        this.$emit('handleChange',val,this.item.field)
    }
}
</script>