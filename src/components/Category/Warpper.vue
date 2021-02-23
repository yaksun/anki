<template>
    <div>
        <div class="list-warpper" v-if="!showCate">
           <div class="list-container">
                <div class="opt-cate">
                    <i class="iconfont icon-huabanbeifen5" @click="centerDialogCateVisible = true"></i>
                    <i class="iconfont icon-zujian-icon-06" @click="handleTab"></i>
              </div>
            <div class="cate-nav">
                <div class="cate-title">
                    <el-tag  @click="handleChangeCate(0)" :class="['cate-item', 0===activeIndex?'active':'']">全部</el-tag>
                    <el-tag @click="handleChangeCate(item.id)" :class="['cate-item', item.id===activeIndex?'active':'']"  v-for="item in cateList" :key="item.id">{{item.title}}</el-tag>
                </div>
            </div>
           </div>
           <div class="content-list">
               <CardItem v-for="(item,index) in tempList" :key="index" @editCard="editCard(item)" :item="item" />
           </div>
       </div>
      <div class="cate-warpper" v-else>
           <div class="title">分类列表 <i class="iconfont icon-huabanbeifen5" @click="centerDialogCateVisible = true"></i><i @click="handleBack" class="iconfont icon-fanhui1"></i></div>
          <div class="cate-container">
               <div class="cate-list">
               <div class="list-item" v-for="item in cateList" :key="item.id">
                   <div class="item-title" >
                      <div class="item-left">
                          <el-input v-model="item.title" :disabled="operStatus !=item.id"/>
                      </div>
                      <div class="item-right" v-show="operStatus===item.id">
                          <i class="iconfont icon-querenduigougouhao" @click="handleOk(item.id)"></i>
                          <i class="iconfont icon-fanhui" @click="handleEditBack"></i>
                      </div>
                 </div>
                 <div class="item-content">3个</div>
                 <div class="item-oper">
                     <i class="iconfont icon-zujian-icon-06" @click="handleEdit(item.id)"></i>
                     <i class="iconfont icon-lajitong" @click="handleDel(item.id)"></i>
                 </div>
                </div>
           </div>
          </div>
       </div>


       <el-dialog
            title="新建分类"
            :visible.sync="centerDialogCateVisible"
            width="30%"
            center>
          <el-form :model="cate">
            <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="cate.title" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancelAddCate">取 消</el-button>
                <el-button type="primary" @click="handleAddCate">确 定</el-button>
            </div>
        </el-dialog>
        <CardModal ref="card" :item="editItem" />
        
    </div>
</template>
<script lang="ts">
import Vue from 'vue' 
import {Component,Ref} from 'vue-property-decorator'
import {State,Getter,Mutation} from 'vuex-class'

import CardItem from '@/components/Category/CardItem.vue'
import {CategoryServices} from '@/bll/category/CategoryServices'
import CardModal from '@/components/Category/CardModal.vue'

@Component({
    components:{
        CardItem,
        CardModal
    }
})
export default class Warpper extends Vue {
    @State('list') cardList:any 
    @State('cateList') cateList:any 
    @Getter('unoinList') unoinList:any 
    @Mutation('ADDCATE') add_cate:any 
    @Mutation('DELCATE') del_cate:any  
    @Mutation('UPDCATE') upd_cate:any  
    @Ref('card') cardModal:any 
   

    showCate=false
    operStatus=0
    activeIndex=0
    categoryServices = new CategoryServices() 
    editItem={}
  

  
    formLabelWidth='50px'

    centerDialogCateVisible=false

  
   
   cate={
       title:''
   }

    // 打开编辑卡片
   editCard(item){
        this.editItem = item 
        this.cardModal.centerDialogVisible = true 
   }

    // 切换Tab
    handleTab(){
        this.showCate=true
    }
    // Tab返回
    handleBack(){
        this.showCate = false
    }

    // 点击编辑显示
    handleEdit(val){
        this.operStatus = val 
    }

    // 点击返回隐藏
    handleEditBack(){
        this.operStatus = 0
    }

    // 编辑后确认
   async handleOk(id){
         this.operStatus = 0
         let activeItem = this.cateList.find(item=>item.id === id)
         const res = await this.categoryServices.updCate(activeItem) 
         if(res){
             this.upd_cate(activeItem)
         }
       
    }

    // 删除
   async handleDel(id){
        const res =  await this.categoryServices.delCate(id) 
        if(res){
            this.del_cate(id)
        }
    }

   

    // 添加分类
   async handleAddCate(){
     const res = await this.categoryServices.addCate(this.cate) 
        if(res){
            this.add_cate(this.cate)
            this.handleCancelAddCate()
        }
    }

    // 取消添加分类 
    handleCancelAddCate(){
            this.centerDialogCateVisible = false 
            this.cate = {
                title:''
            }
    }

    

    // 点击分类时触发 
    handleChangeCate(id){
        this.activeIndex = id
       
    }


    get tempList(){
        let tempList = this.unoinList

        if(this.activeIndex!=0){
         tempList = tempList.filter(item=>item.cateId=== this.activeIndex)
        }
        return tempList
    }

}
</script>
<style lang="scss">
      .list-warpper{
         height: calc( 100vh - 40px );
         .list-container{
             display: flex;
             .opt-cate{
                    width: 80px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                i{
                    cursor: pointer;
                }
             }
            .cate-nav{
                flex:1;
              height: 40px;
              overflow: auto;
             .cate-title{
                 height: 100%;
                 align-items: center;
                 width: max-content;
               display: flex;
                .cate-item{
                    width: 80px;
                    text-align: center;
                    height: 100%;
                    margin: 0 10px;
                    box-sizing: border-box;
                    line-height: 40px;
                    &.active{
                        background-color: rgb(26, 115, 232);
                        color: #fff;
                    }
                }
             }
       }  
         }
         .content-list{
             height: calc( 100% - 100px );
             overflow: auto;
         }
       
     }
    
       .cate-warpper{
         padding: 0 10px;
        height: calc( 100vh - 40px);
        .cate-container{
            overflow: auto;
            height: calc(100% - 80px);
        }
         .title{
             i{
                 margin-left: 10px;
             }
         }
            i{
                        cursor: pointer;
                }
         .cate-list{
             display: grid;
             grid-template-columns: repeat(2,1fr);
                grid-gap: 10px;
             .list-item{
                 display: flex;
                 border: 1px solid #ccc;
                 height: 150px;
                flex-direction: column;
           
                .item-title{
                    height: 40px;
                    display: flex;
                    align-items: center;
                    padding: 0 20px;
                    border-bottom: 1px solid #ccc;
                    .item-left{
                        width: 50%;
                        text-align: left;
                    }
                    .item-right{
                        flex:1;
                        text-align: right;
                        i{
                            margin-left: 10px;
                        }
                    }
                }
                .item-content{
                    height: calc(100% - 80px);
                       padding: 0 20px;
                    border-bottom: 1px solid #ccc;
                }
                .item-oper{
                    height: 40px;
                    text-align: right;
                    padding: 0 20px;
                    i{
                        margin-left: 10px;
                    }
                 
                }
             }
         }
     }
</style>