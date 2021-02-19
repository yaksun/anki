<template>
  <div id="app">
    <router-view/>
    <Footer v-show="$route.path!='/login'"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'


import Footer from '@/components/Footer/Footer.vue'

@Component({
   components:{
    Footer
  }
})
export default class App extends Vue {
  
}
</script>
<style>

</style>
