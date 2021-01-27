<template>
  <div class="about">
    <h1>This is an home page</h1>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {HomeServices} from '@/bll/home/HomeServices'


@Component({})
export default class Home extends Vue{
   mounted() {
    this.getList()
  }

  async getList(){
     const homeServices = new HomeServices(); 
     const res = await homeServices.getHomeList({})
     console.log(res)
  }
}
</script>