<template>
   <el-select 
   :placeholder="item.desc" 
   v-model="value" 
   :disabled="item.disabled"
   :clearable="item.clearable"
   :multiple="item.multiple" 
   :filterable="item.filterable" 
   :allow-create="item.allowCreate"
   >
        <el-option
                        v-for="item2 in item.dic"
                        :key="item2.value"
                        :label="item2.label"
                        :value="item2.value">
        </el-option>
   </el-select>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop,Watch} from 'vue-property-decorator'

@Component({})
export default class YaSelect extends Vue{
    @Prop({})
    private item

     @Prop({})
    private val

    private value =""

    created(){
       this.value = this.val 
    }

    @Watch('value')
    handleChange(val): void{
        this.$emit('handleChange',val,this.item.field)
    }
}
</script>