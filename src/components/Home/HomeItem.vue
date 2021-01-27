<template>
    <div class="homeitem-template-class">
        <div :class="['flip-warpper', activeId===item.id ? 'active' :'' ]">
             <div class="front">
            <el-card >
                {{item.title}}
            </el-card>
            </div>
            <div class="back">
              <el-card>
                  {{item.content}}
              </el-card>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue' 
import {Component,Prop} from 'vue-property-decorator'

@Component({})
export default class HomeItem extends Vue{
    @Prop(Object)
    item

    @Prop(Number)
    activeId

   
    mounted() {
        console.log(this.item)   
    }
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
       }
    .back{
        transform: rotateY(-180deg);
        .el-card{
        background-color: rgb(255, 192, 203)
        }
        }
    .front{
        z-index:2;
        .el-card{
        background-color: rgb(128, 0, 128);
        }
        }
    }
  }  
</style>