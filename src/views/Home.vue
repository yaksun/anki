<template>
  <div class="home-template-class">
  <ul >
    <li v-for="item in list" :key="item.id" @click="handleClick(item.id)" >
      <HomeItem :item="item" :activeId="activeId" />
    </li>
  </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {HomeServices} from '@/bll/home/HomeServices'
import {home_result_model_detail} from  '@/model/home/home_result_model'
import PubSub from 'pubsub-js'

import HomeItem from '@/components/Home/HomeItem.vue'

@Component({
  components:{
    HomeItem
  }
})
export default class Home extends Vue{
   list:Array<home_result_model_detail>=[]
   activeId=0
   mounted() {
    this.getList()
    PubSub.subscribe('refreshHome',()=>{
        this.getList()
    })
  }

  // 获取列表数据
  async getList(){
     const homeServices = new HomeServices(); 
     const res = await homeServices.getHomeList({})
     if(res &&  res.data){
       this.list = res.data 
     }
  }

  // 点击翻转
  handleClick(val){
    if(this.activeId != val ){
      this.activeId = val 
    }else{
      this.activeId = 0
    }
   
  }
}
</script>
<style lang="scss" type='stylesheet/scss'>
  .home-template-class{
    height: calc(100vh - 40px );
    display: flex;
    justify-content: center;
    overflow-y: auto;
    &>ul{
      width:100%;
      &>li{
        height: 200px;
        padding: 15px 10px;
      }
      
    }
  }
</style>