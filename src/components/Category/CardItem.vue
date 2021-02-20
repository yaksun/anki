<template>
    <el-card class="carditem-template-class">
       <div class="header">
            <h3>{{item.title}}</h3>
            <el-tag>{{item.cateName}}</el-tag>
       </div>
       <p>{{item.content}}</p>
       <span class="time" v-if="item.nextShowTime">敌军还有2天到达战场</span>
       <span class="time" v-else>一切还是未知数</span>
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
       .el-card__body{
           position: relative;
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
        .time{
               position: absolute;
               right: 10px;
               bottom:10px;
           }
       }
       
   } 
</style>