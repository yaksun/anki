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
               <CardItem v-for="(item,index) in cardList" :key="index" :item="item" />
           </div>
       </div>
      <div class="cate-warpper" v-else>
           <div class="title">分类列表 <i class="iconfont icon-huabanbeifen5" @click="centerDialogCateVisible = true"></i><i @click="handleBack" class="iconfont icon-fanhui1"></i></div>
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

    </div>
</template>
<script lang="ts">
import Vue from 'vue' 
import {Component} from 'vue-property-decorator'

import {CategoryServices} from '@/bll/category/CategoryServices'
import {cate_result_model_detail} from  '@/model/category/cate_result_model'

import CardItem from '@/components/Category/CardItem.vue'


@Component({
    components:{
        CardItem
    }
})
export default class Warpper extends Vue {
     cateList:Array<cate_result_model_detail>=[]

    cardList=[
            {id:1,title:'xx',content:'yyyyy1',cate:'vue'},
            {id:2,title:'xx',content:'yyyyy2',cate:'react'},
            {id:3,title:'xx',content:'yyyyy3',cate:'angular'}
    ]

    showCate=false
    operStatus=0
    activeIndex=0

  

    centerDialogVisible= false
    formLabelWidth='50px'

    centerDialogCateVisible=false

  
   
   cate={
       title:''
   }

    created() {
        this.getCateList() 
    }


      // 获取列表数据
  async getCateList(){
    
     const cateServices = new CategoryServices(); 
     const res = await cateServices.getCateList({})
     if(res &&  res.data){
       this.cateList = res.data 
     }
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
    handleOk(id){
         this.operStatus = 0
         let activeItem = this.cateList.find(item=>item.id === id)
        console.log(id,activeItem)
    }

    // 删除
    handleDel(id){
        this.cateList = this.cateList.filter(item=>item.id != id)
    }

   

    // 添加分类
    handleAddCate(){
        console.log(this.cate);
        
      this.handleCancelAddCate()
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
             height: calc( 100% - 80px );
             overflow: auto;
         }
       
     }
    
       .cate-warpper{
         padding: 0 10px;
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