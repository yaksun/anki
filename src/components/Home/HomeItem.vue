<template>
    <div class="homeitem-template-class">
        <div :class="['flip-warpper', activeId===item.id ? 'active' :'' ]">
             <div class="front">
            <el-card >
                <div class="content"> {{item.title}}</div>
            </el-card>
            </div>
            <div class="back">
              <el-card>
                 <div class="content"> {{item.content}}</div>
                   <HomeDot :itemId="item.id" />
              </el-card>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue' 
import {Component,Prop} from 'vue-property-decorator'

import HomeDot from '@/components/Home/HomeDot.vue'

@Component({
    components:{
        HomeDot
    }
})
export default class HomeItem extends Vue{
    @Prop(Object)
    item

    @Prop(Number)
    activeId

 
}
</script>
<style lang="scss" type='stylesheet/scss'>
  .homeitem-template-class{
      width: 100%;
      height: 100%;
     perspective:1000px;
    transform-style:preserve-3d;
   .active{
       transform:rotateY(180deg);
   }
    .flip-warpper{
        width: 100%;
        height: 100%;
        position:relative;
      transition:0.6s;
      transform-style:preserve-3d;
      .front,.back{
       position:absolute;
       width: 100%;
       height: 100%;
       top: 0px;
       left: 0px;
       backface-visibility:hidden;
       }
       .el-card{
           width: 100%;
           height: 100%;
           display: flex;
           .el-card__body{
               width: 100%;
               height: 100%;
               display: flex;
                flex-direction: column;
               padding: 0;
               .content{
                  flex:1;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                     overflow-y: auto;
                    margin: 10px;
                    box-sizing: border-box;
               }
           }
       }
    .back{
        transform: rotateY(-180deg);
        .content{
            border-bottom: 1px solid #555;
        }
       
        }
    .front{
        z-index:2;
      
        }
    }
  }  
</style>