<template>
    <div class="footer-template-class">
        <div class="footer-list">
            <a @click="handleClick(item.path)"  :class="['footer-item', currentPath=== item.path ? 'active-footer' : '' ]" v-for="item in navList" :key="item.id">
                <i :class="['iconfont',item['class'] ]"></i>
            </a>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
@Component({

})
export default class Footer extends Vue {
     navList=[
        {id:1,name:'列表',path:'/home',class:'icon-menu-home-normal'},
        {id:2,name:'分类',path:'/cate',class:'icon-icon-goodscategory'},
        {id:3,name:'我的',path:'/about',class:'icon-about'}
        ]

     currentPath='/home'  

      
      handleClick(path){
          this.currentPath = path+'' 
          this.$router.replace(path)
      }  
}
</script>
<style lang="scss" type='stylesheet/scss'>
 .footer-template-class  {
    border-top:1px solid #ccc;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    .footer-list{
        display: flex;
        align-content: center;
        .footer-item{
            flex:1;
            text-align: center;
            .iconfont{
                 font-size: 30px;
            }
        }
        .active-footer{
             color: red;   
        }
        
    }
    }
</style>