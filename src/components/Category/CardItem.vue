<template>
    <el-card class="carditem-template-class">
       <h3>xxx</h3>
       <p>yyy</p>
    </el-card>
</template>
<script lang="ts"> 
import Vue from 'vue' 
import {Component} from 'vue-property-decorator'
@Component({})
export default class CardItem extends Vue {
    
}
</script>
<style lang="scss">
   .carditem-template-class{
       margin: 15px 0;
   } 
</style>