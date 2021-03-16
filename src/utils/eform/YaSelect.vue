<template>
   <el-select :placeholder="item.desc" v-model="value">
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

    private value =""

    @Watch('value')
    handleChange(val): void{
        this.$emit('handleChange',val,this.item.field)
    }
}
</script>