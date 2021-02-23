<template>
    <el-card class="carditem-template-class">
       <div class="header">
            <h3>{{item.title}}</h3>
            <el-tag>{{item.cateName}}</el-tag>
       </div>
       <p class="content">{{item.content}}</p>
       <p class="oper">
              <i class="iconfont icon-zujian-icon-06" @click="handleEdit(item)"></i>
              <i class="iconfont icon-lajitong" @click="handleDel(item.id)"></i>
               <span class="time" v-if="item.nextShowTime">敌军还有2天到达战场</span>
             <span class="time" v-else>一切还是未知数</span>
       </p>
    </el-card>
</template>
<script lang="ts"> 
import Vue from 'vue' 
import {Component,Prop} from 'vue-property-decorator'
import {Mutation} from 'vuex-class'
import {HomeServices} from '@/bll/home/HomeServices'
@Component({})
export default class CardItem extends Vue {
    @Prop(Object)
    item
    @Mutation('DELCARD') del_card:any 
    
    homeServices = new HomeServices()

    handleEdit(item){
        this.$emit('editCard',item)
    }

   async handleDel(id){
      
        const res =await this.homeServices.delCard(id)
        if(res){
                this.del_card(id)
        }
        
    }
  
}
</script>
<style lang="scss">
   .carditem-template-class{
       margin: 15px 0;
     
       .el-card__body{

            .content{
                margin: 10px 0;
            }
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
         .oper{
             i:nth-child(1){
                 margin-right: 10px;
             }

             .time{
             float: right;
         }
         }
         
       }
       
   } 
</style>