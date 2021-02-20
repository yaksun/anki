<template>
    <div class="category-template-list">
     <Search  />
      <Warpper />  
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

import Search from '@/components/Category/Search.vue'
import Warpper from '@/components/Category/Warpper.vue'

@Component({
    components:{
     
        Search,
        Warpper
    }
})
export default class Category extends Vue {


}
</script>
<style lang="scss" type='stylesheet/scss'>
 .category-template-list{
     height: 100vh;
 }   
</style>