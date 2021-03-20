<template>
   <div class="autoTable-template-class">
     <ya-form :options="options2" :params="val">
       <el-button  type="primary" @click="handleSearch">搜索</el-button>
      <el-button  @click="handleAdd">添加</el-button>
     </ya-form>
      <HomeTable
    :tableData="data"
    :options="options"
    @changeCurrent="changeCurrent"
    >
      <el-table-column v-if="options.operStatus" align="center"
                         width="180"
                         label="操作">
          <template slot-scope="scope">
            <!-- <el-button plain
                       circle
                       size="mini"
                       type="primary"
                       icon="el-icon-document"
                       @click="handleDetailClick(scope.row)"></el-button> -->
            <el-button plain
                       circle
                       size="mini"
                       type="primary"
                       icon="el-icon-edit"
                       @click.stop="handleUpdateClick(scope.row)"></el-button>
            <el-button plain
                       circle
                       size="mini"
                       type="danger"
                       icon="el-icon-delete"
                       @click.stop="handleDeleteClick(scope.row)"></el-button>
          </template>
      </el-table-column>
    </HomeTable>
    <ya-dialog 
     v-if="isShowDialog"
    :isShowDialog="isShowDialog"
    :options="options"
     :val="val" 
       @close="closeDialog"/>
   </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

import HomeTable from '@/components/Home/HomeTable.vue'
import YaDialog from '@/utils/edialog/YaDialog.vue'
import YaForm from '@/utils/eform/YaForm.vue'
import {HomeServices} from '@/bll/home/HomeServices'
@Component({
    components:{
        HomeTable,
        YaDialog,
        YaForm
    }
})
export default class AutoTable extends Vue{
      bll = new HomeServices()

      private options2={
         inlineStatus:true,
            labelWidth:'80px',
            ruleForm:{},
            initStatus:true,
        columns:[
           {label:'时间',field:'trade_date',prop:'trade_date',width:'240',desc:'输入日期',type:'date',clearable:true},
            {label:'类型',field:'trade_type',prop:'trade_type',width:'180',desc:'请输入类型',type:'input'},
               {label:'品种',field:'security_name',prop:'security_name',desc:'请输入品种名称',type:'input'}
        ]
      }
        
      
      // 头部横向表单配置
        private options={
            inlineStatus:true,
            labelWidth:'80px',
            ruleForm:{},
            operStatus:true,
            columns:[
                {label:'时间',field:'trade_date',prop:'trade_date',width:'240',desc:'输入日期',type:'date',clearable:true},
                {label:'交易单号',field:'trade_no',prop:'trade_no',width:'180',desc:'请输入单号',type:'input'},
                {label:'类型',field:'trade_type',prop:'trade_type',width:'180',desc:'请输入类型',type:'input'},
                {label:'品种编号',field:'security_code',prop:'security_code',desc:'请输入品种编号',type:'input'},
                {label:'品种',field:'security_name',prop:'security_name',desc:'请输入品种名称',type:'input'},
                {label:'委托价格',field:'proxy_price',prop:'proxy_price',desc:'请输入委托价格',type:'input'},
                {label:'成交价格',field:'real_price',prop:'real_price',desc:'请输入成交价格',type:'input'},
                {label:'止损价格',field:'sl_price',prop:'sl_price',desc:'请输入止损价格',type:'input'},
                {label:'止盈价格',field:'tl_price',prop:'tl_price',desc:'请输入止盈价格',type:'input'},
                {label:'佣金',field:'sl_price',prop:'sl_price',desc:'请输入佣金',type:'input'},
                {label:'利润',field:'profit',prop:'profit',desc:'请输入利润',type:'input'},
                {label:'买卖理由',field:'reason',prop:'reason',desc:'请输入买卖理由',type:'textarea',autosize:true},
                {label:'校验',field:'verify',prop:'verify',desc:'请输入校验',type:'input'},
                {label:'最大浮亏',field:'floating_loss',prop:'floating_loss',desc:'请输入最大浮亏',type:'input'},
                {label:'最大浮盈',field:'floating_profit',prop:'floating_profit',desc:'请输入最大浮盈',type:'input'},
                {label:'备注',field:'remark',desc:'请输入备注',type:'textarea',autosize:true},
                {label:'图片',field:'imgList',type:'upload',hidden:true,url:'http://www.baidu.com'}
            ],
            initStatus:true
           
        }


        private val={}
        private isShowDialog:boolean=false
        private data={}
        private params={current:1,pageSize:20}

    mounted(){
        this.getList()
    }

   async getList(){
    
    const res = await  this.bll.getHomeList(this.params)
     res.data.data =  res.data.data.map(item=>{
        return {
          ...item,
          cate:item.cate ? {img_path:item.cate.img_path.split(','),thumb_path:item.cate.thumb_path.split(',')} : {img_path:[],thumb_path:[]}
        }
     })
      this.data = res.data 
      
    }

    changeCurrent(val){
      this.params.current = val 
      this.getList()
    }

    handleAdd(){
      let temp={title:'添加数据'}
      this.val = temp 
      this.isShowDialog = true 

    }


       // 查看详情
    handleDetailClick(row){
       
      // 指定操作类型
      let temp = Object.assign({},row)
      temp.title="查看详情" 
      temp.oper='detail'
      this.val = temp 
      this.options.columns =  this.options.columns.map(item=>{
        return {
          ...item,
         disabled:true
        }
      })
      this.isShowDialog = true 
      
    }

    // 修改界面
    handleUpdateClick(row){
      let temp = Object.assign({},row)
      temp.title="修改数据" 
      temp.oper='update'
      this.val = temp 
       this.options.columns =  this.options.columns.map(item=>{
        return {
          ...item,
         disabled:false
        }
      })
      this.isShowDialog = true 
    }

    // 删除操作
    handleDeleteClick(val){
         this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let params = Object.assign({},{id:val.id})
          // const res = await this.bll.delApi(params)
          const res={code:200}
          if(res.code===200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //  this.getList()
          }else{
              this.$message({
              type: 'info',
              message: '删除失败'
            });      
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }

    // 搜索操作
    handleSearch(){

    }

    // 重置数据
    closeDialog(){
      this.isShowDialog = false
      this.val={}
    }
}
</script>
<style lang="scss">
.autoTable-template-class{
   .add-btn {
    position: absolute;
    z-index: 10;
    right: 10px;
    top: 2px
   }
   .el-dialog__wrapper{
     overflow: hidden;
     .el-dialog{
     width: 80%  !important;
     margin-top: 2vh  !important;
       .el-form-item{
         width: 30% ;
         .el-form-item__content{
           width: calc( 100% - 80px);
         }
       }
      .oper-btn{
        width:100% ;
        text-align: right;
      } 
   }
   }
   
   .yaForm-template-class{
     .el-form-item{
     margin-top: 20px;
    }
    .el-button{
      margin-top: 20px;
    }
   }
   
   
}
 
</style>