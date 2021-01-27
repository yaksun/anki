<template>
  <div class="about">
    <ul>
      <li v-for="item in list" :key="item.id">{{item.id}}</li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {HomeServices} from '@/bll/home/HomeServices'
import {home_result_model_detail} from  '@/model/home/home_result_model'
@Component({})
export default class Home extends Vue{
   list:Array<home_result_model_detail>=[]
   mounted() {
    this.getList()
  }

  async getList(){
     const homeServices = new HomeServices(); 
     const res = await homeServices.getHomeList({})
     if(res &&  res.data){
       this.list = res.data 
     }
    
  }
}
</script>
<style lang="">
  
</style>