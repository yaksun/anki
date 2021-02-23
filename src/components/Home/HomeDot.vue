<template>
    <div class="homedot-template-class">
        <i :class="['iconfont', 'icon-kunnan',dotObj[item['id']+'']===1 ? 'active' :'']" @click="handleItem($event,1)"></i>
        <i :class="['iconfont', 'icon-biaoqing',dotObj[item['id']+'']===2 ? 'active' :'']" @click="handleItem($event,2)"></i>
        <i :class="['iconfont', 'icon-biaoqing1',dotObj[item['id']+'']===3 ? 'active' :'' ]" @click="handleItem($event,3)"></i>
        <i :class="['iconfont', 'icon-xiaolian',dotObj[item['id']+'']===4 ? 'active' :'']" @click="handleItem($event,4)"></i>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'
import {Action,State} from 'vuex-class'
import {HomeServices} from '@/bll/home/HomeServices'
import PubSub from 'pubsub-js'
@Component({})
export default class HomeDot extends Vue{
    @Action('setDot') setDot:any
    @State('dotObj') dotObj:any
    @Prop(Object)
    item  

    homeServices = new HomeServices()
    
    async handleItem(e,val){
       
        e.stopPropagation();
        let key=this.item.id
        let len =Math.pow(2,val-1) 
        let params = this.item 
        params.lastShowTime= params.nextShowTime
        params.nextShowTime =params.nextShowTime+ 24*60*60*1000*len

        const res =await this.homeServices.updCard(params)
        if(res){
            this.setDot({
            [key]:val
          })

        PubSub.publish('refresh')
        }
       
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