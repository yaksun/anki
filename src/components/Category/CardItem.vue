<template>
    <el-card class="carditem-template-class">
       <div class="header">
            <h3>{{item.title}}</h3>
            <el-tag>{{item.cate}}</el-tag>
       </div>
       <p>{{item.content}}</p>
    </el-card>
</template>
<script lang="ts"> 
import Vue from 'vue' 
import {Component,Prop} from 'vue-property-decorator'
@Component({})
export default class CardItem extends Vue {
    @Prop(Object)
    item 
}
</script>
<style lang="scss">
   .carditem-template-class{
       margin: 15px 0;
       .header{
           display: flex;
           .el-tag{
               width: 100px;
               text-align: center;
           }
           h3{
               flex:1;
           }
       }
   } 
</style>