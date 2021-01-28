<template>
    <div class="homedot-template-class">
        <i :class="['iconfont', 'icon-kunnan',dotObj[itemId+'']===1 ? 'active' :'']" @click="handleItem($event,1)"></i>
        <i :class="['iconfont', 'icon-biaoqing',dotObj[itemId+'']===2 ? 'active' :'']" @click="handleItem($event,2)"></i>
        <i :class="['iconfont', 'icon-biaoqing1',dotObj[itemId+'']===3 ? 'active' :'' ]" @click="handleItem($event,3)"></i>
        <i :class="['iconfont', 'icon-xiaolian',dotObj[itemId+'']===4 ? 'active' :'']" @click="handleItem($event,4)"></i>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'
import {Action,State} from 'vuex-class'
import PubSub from 'pubsub-js'
@Component({})
export default class HomeDot extends Vue{
    @Action('setDot') setDot:any
    @State('dotObj') dotObj:any
    @Prop(Number)
    itemId    
    
    handleItem(e,val){
        e.stopPropagation();
        let key=this.itemId
        this.setDot({
            [key]:val
        })

        PubSub.publish('refreshHome')
    }
}
</script>
<style lang="scss" type='stylesheet/scss'>
    .homedot-template-class{
        height: 40px;
        width: 100%;
        display: flex;
        .active{
            color: red;
        }
        .iconfont{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }

    }
</style>