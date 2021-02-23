<template>
     <div class="search">
               <div class="search-input">
               <el-input v-model="keyword" >
                     <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
               </el-input>
            </div>
            <div class="add-item">
                <i class="iconfont icon-tianjia" @click="handleShow"></i>
            </div>
          <CardModal ref="card" />
        </div>
</template>
<script lang="ts">
import Vue from 'vue' 
import {Component,Ref} from 'vue-property-decorator'

import CardModal from '@/components/Category/CardModal.vue'

@Component({
  components:{
    CardModal
  }
})
export default class Search extends Vue {
   @Ref('card')  cardModal

    keyword:String=''
    centerDialogVisible=false

       // 搜索
    handleSearch(){

    }

    handleShow(){
        this.cardModal.centerDialogVisible = true 
    }

   
}
</script>
<style lang="scss">
    .search{
         margin: 10px 5px;
         display: flex;
         .search-input{
             flex:1;
         }
         .add-item{
             width: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
         }
     } 
</style>