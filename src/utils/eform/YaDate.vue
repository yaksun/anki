<template>
      <el-date-picker
      v-model="value"
      :val="val"
     :placeholder="item.desc" 
     :disabled="item.disabled"
     :clearable="item.clearable"
      type="date">
    </el-date-picker>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop,Watch} from 'vue-property-decorator'

@Component({})
export default class YaDate extends Vue{
      @Prop({})
    private item

     @Prop({})
    private val

    private value=''

     
    created(){
        this.value = this.val
    }
     
     
    @Watch('value')
    handleChange(val): void{
        this.$emit('handleChange',val,this.item.field)
    }
}
</script>