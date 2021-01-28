<template>
    <div class="category-template-list">
        <div class="search">
               <div class="search-input">
               <el-input />
            </div>
            <div class="add-item">
                <i class="iconfont icon-tianjia"></i>
            </div>
        </div>
     
       <div class="list-warpper" v-if="!showCate">
           <div class="list-container">
                <div class="opt-cate">
                    <i class="iconfont icon-huabanbeifen5"></i>
                    <i class="iconfont icon-zujian-icon-06" @click="handleTab"></i>
              </div>
            <div class="cate-nav">
                <div class="cate-title">
                    <div class="cate-item"  v-for="item in cateList" :key="item.id">{{item.title}}</div>
                </div>
            </div>
           </div>
           <div class="content-list">

           </div>
       </div>
       <div class="cate-warpper" v-else>
           <div class="title">分类列表 <i class="iconfont icon-huabanbeifen5"></i><i @click="handleBack" class="iconfont icon-fanhui1"></i></div>
           <div class="cate-list">
               <div class="list-item" v-for="item in cateList" :key="item.id">
                   <div class="item-title">
                      <div class="item-left">
                           {{item.title}}
                      </div>
                      <div class="item-right" v-show="operStatus===item.id">
                          <i class="iconfont icon-querenduigougouhao"></i>
                          <i class="iconfont icon-fanhui" @click="handleEditBack"></i>
                      </div>
                 </div>
                 <div class="item-content">3个</div>
                 <div class="item-oper">
                     <i class="iconfont icon-zujian-icon-06" @click="handleEdit(item.id)"></i>
                     <i class="iconfont icon-lajitong"></i>
                 </div>
                </div>
           </div>
       </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({})
export default class Category extends Vue {
    cateList=[
        {id:1,title:'xx'},
        {id:2,title:'yy'},
        {id:3,title:'zz'},
        {id:4,title:'zzdd'},
        {id:5,title:'zzee'}
    ]

    showCate=false
    operStatus=0

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
}
</script>
<style lang="scss" type='stylesheet/scss'>
 .category-template-list{
     height: 100vh;
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
     .list-warpper{
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
                    border: 1px solid #1A73E8;
                    height: 100%;
                    margin: 0 10px;
                    box-sizing: border-box;
                    line-height: 40px;
                }
             }
       }  
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
                        flex:1;
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

 }   
</style>