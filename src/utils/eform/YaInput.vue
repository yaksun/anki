<template>
    <el-input v-model="value" :placeholder="placeholder" ></el-input>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop,Watch} from 'vue-property-decorator'

@Component({})
export default class YaInput extends Vue{
    @Prop({})
    private info

    @Prop({})
    private placeholder 

     @Prop({})
    private field

    value="" 

    created(){
        this.value = this.info
    }

    @Watch('value')
    handleChange(val){
        this.$emit('handleChange',val,this.field)
    }
}
</script>