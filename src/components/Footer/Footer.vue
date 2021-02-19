<template>
    <div class="footer-template-class">
        <div class="footer-list">
           
             <a :class="['footer-item' ,$route.path=== '/home' ? 'active-footer' : ''  ]" @click="handleGoto('home')">
                <i class="iconfont icon-menu-home-normal"></i>
            </a>
            <a :class="['footer-item' ,$route.path=== '/cate' ? 'active-footer' : ''  ]" @click="handleGoto('cate')">
                <i class="iconfont icon-icon-goodscategory"></i>
            </a>
            <a :class="['footer-item' ,$route.path=== '/login' ? 'active-footer' : ''  ]" @click="handleGoto('login')">
                <i class="iconfont icon-about"></i>
            </a>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'
@Component({

})
export default class Footer extends Vue {
  
    handleGoto(path){
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