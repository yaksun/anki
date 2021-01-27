<template>
    <div class="homedot-template-class">
        <i class="iconfont icon-kunnan" @click="handleItem(1)"></i>
        <i class="iconfont icon-biaoqing" @click="handleItem(2)"></i>
        <i class="iconfont icon-biaoqing1" @click="handleItem(3)"></i>
        <i class="iconfont icon-xiaolian" @click="handleItem(4)"></i>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'

@Component({})
export default class HomeDot extends Vue{
    @Prop(String)
    itemId    
    
    handleItem(val){
        console.log(val)
    }
}
</script>
<style lang="scss" type='stylesheet/scss'>
    .homedot-template-class{
        height: 40px;
        width: 100%;
        display: flex;
        .iconfont{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }

    }
</style>