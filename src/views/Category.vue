<template>
    <div class="category-template-list">
        <div class="search">
               <div class="search-input">
               <el-input />
            </div>
            <div class="add-item">
                <i class="iconfont icon-tianjia" @click="centerDialogVisible = true"></i>
            </div>
        </div>
     
       <div class="list-warpper" v-if="!showCate">
           <div class="list-container">
                <div class="opt-cate">
                    <i class="iconfont icon-huabanbeifen5" @click="centerDialogCateVisible = true"></i>
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

          <el-dialog
            title="添加卡片"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
          <el-form :model="form">
            <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input v-model="form.content" autocomplete="off" type="textarea" :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="分类" :label-width="formLabelWidth">
            <el-select v-model="form.cate" placeholder="请选择分类">
                <el-option label="vue" value="vue"></el-option>
                <el-option label="react" value="react"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleAddItem">确 定</el-button>
            </div>
        </el-dialog>
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

    centerDialogVisible= false
    formLabelWidth='50px'

    centerDialogCateVisible=false

    form={
        title:'',
        content:'',
        cate:''
    }
   
   cate={
       title:''
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

    // 添加卡片
    handleAddItem(){
        // console.log( this.form);
       this.handleCancel() 
    }

    // 取消卡片添加
    handleCancel(){
         this.centerDialogVisible = false
        this.clearItemForm()
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

    // 清空表单
    clearItemForm(){
        this.form={
             title:'',
            content:'',
            cate:''
        }
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