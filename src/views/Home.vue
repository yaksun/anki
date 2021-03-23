<template>
   <div class="autoTable-template-class">
     <ya-form :options="options2" :params="val" class="search-warpper">
       <el-button  type="primary" @click="handleSearch" >搜索</el-button>
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
    @handleSubmit="handleSubmit"
    :options="options"
    :val="val" 
    @close="closeDialog">
      <YaUpload
      @handleRemoveImgUrl="handleRemoveImgUrl"
       @handleImgUrl="handleImgUrl" 
       :itemList="itemList"/>
    </ya-dialog>
   </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Watch} from 'vue-property-decorator'

import HomeTable from '@/components/Home/HomeTable.vue'
import YaDialog from '@/utils/edialog/YaDialog.vue'
import YaForm from '@/utils/eform/YaForm.vue'
import {HomeServices} from '@/bll/home/HomeServices'
import {CategoryServices} from '@/bll/category/CategoryServices'
import YaUpload from '@/utils/eform/YaUpload.vue'
import moment  from 'moment'
@Component({
    components:{
        HomeTable,
        YaDialog,
        YaForm,
        YaUpload
    }
})
export default class AutoTable extends Vue{
      bll = new HomeServices()
      cate = new CategoryServices();

       options2={
         inlineStatus:true,
            labelWidth:'80px',
            ruleForm:{},
            initStatus:true,
        columns:[
           {label:'时间',field:'trade_date_begin',desc:'输入日期',type:'date',clearable:true},
           {label:'~',field:'trade_date_end',desc:'输入日期',type:'date',clearable:true},
            {label:'类型',field:'trade_type',desc:'请输入类型',type:'input',clearable:true},
               {label:'品种',field:'security_name',desc:'请输入品种名称',type:'input',clearable:true}
        ]
      }
        
      
      // 头部横向表单配置
         options={
            inlineStatus:true,
            labelWidth:'80px',
            ruleForm:{},
            operStatus:true,
            columns:[
                {label:'时间',field:'trade_date',prop:'trade_date',width:'240',desc:'输入日期',type:'date',clearable:true},
                {label:'交易单号',field:'trade_no',width:'180',desc:'请输入单号',type:'input'},
                {label:'类型',field:'trade_type',prop:'trade_type',width:'180',desc:'请输入类型',type:'input'},
                {label:'品种编号',field:'security_code',prop:'security_code',desc:'请输入品种编号',type:'input'},
                {label:'品种',field:'security_name',prop:'security_name',desc:'请输入品种名称',type:'input'},
                {label:'委托价格',field:'proxy_price',desc:'请输入委托价格',type:'input',show:'number'},
                {label:'成交价格',field:'real_price',desc:'请输入成交价格',type:'input',show:'number'},
                {label:'止损价格',field:'sl_price',desc:'请输入止损价格',type:'input',show:'number'},
                {label:'止盈价格',field:'tl_price',desc:'请输入止盈价格',type:'input',show:'number'},
                {label:'佣金',field:'sl_price',desc:'请输入佣金',type:'input',show:'number'},
                {label:'利润',field:'profit',desc:'请输入利润',type:'input',show:'number'},
                {label:'买卖理由',field:'reason',desc:'请输入买卖理由',type:'textarea',autosize:true},
                {label:'校验',field:'verify',desc:'请输入校验',type:'input',show:'number'},
                {label:'最大浮亏',field:'floating_loss',desc:'请输入最大浮亏',type:'input',show:'number'},
                {label:'最大浮盈',field:'floating_profit',desc:'请输入最大浮盈',type:'input',show:'number'},
                {label:'备注',field:'remark',desc:'请输入备注',type:'textarea',autosize:true}
            ],
            initStatus:true
           
        }


         val={}
         isShowDialog:boolean=false
         data={}
         params={current:1,pageSize:20}
         operStatus='add'
         currentId
         cateId
         imgArr:any=[] 
         itemList=[] 

    mounted(){
        this.getList()
    }

   async getList(){
  
    const res = await  this.bll.getHomeList(this.params)
     res.data.data =  res.data.data.map(item=>{
        return {
          ...item,
          cate:item.cate.img_path ? {img_path:item.cate.img_path.split(','),thumb_path:item.cate.thumb_path.split(',')} : {img_path:[],thumb_path:[]}
        }
     })
    let arr:any=[] 
    this.options.columns.forEach(item=>{
       if(item.show==='number'){
         arr.push(item.field)
       }
    })
    res.data.data.forEach(item=>{
       arr.forEach(mini=>{
         item[mini] = parseInt(item[mini]*100+'')/100
       })
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
      this.val = temp 
      this.currentId = row.id
      this.cateId = row.cateId
      this.imgArr = (this.val as any).cate.thumb_path
      this.itemList = temp.cate.thumb_path.map(item=>{
                  return {
                  url:item 
                  }
      })   
      this.operStatus='upd'
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
  
      let _this = this 
         this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let params = Object.assign({},{id:val.id})
          let params2 = Object.assign({},{id:val.cateId})
          const res = await this.bll.delCard(params)
          if(res.code===200){
             await this.cate.delCate(params2)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
             this.getList()
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
   async handleSearch(){
       if(this.options2.ruleForm['trade_date_begin'] && this.options2.ruleForm['trade_date_end'] && new Date(this.options2.ruleForm['trade_date_begin']).getTime()>new Date(this.options2.ruleForm['trade_date_end']).getTime()){
             this.$message({
            type: 'warning',
            message: '开始时间不能大于结束时间'
          });   

          return ;
        }
        const res = await this.bll.getHomeList({...this.params,...this.options2.ruleForm})
          res.data.data =  res.data.data.map(item=>{
          return {
            ...item,
            cate:item.cate ? {img_path:item.cate.img_path.split(','),thumb_path:item.cate.thumb_path.split(',')} : {img_path:[],thumb_path:[]}
          }
      })
        this.data = res.data 
        
    }

    // 重置数据
    closeDialog(){
      this.isShowDialog = false
      this.val={}
      this.operStatus='add'
      this.imgArr=[]
    }

    //提交操作
   async handleSubmit(val){
     let _this =  this 
        let urlRes 
       if(this.operStatus==='upd'){
           urlRes = await this.cate.updCate({
            id:_this.cateId,
           img_path:this.imgArr.join(','),
           thumb_path:this.imgArr.join(',')
         })
       }else{
          urlRes = await this.cate.addCate({
           img_path:this.imgArr.join(','),
           thumb_path:this.imgArr.join(',')
         })
       }

     let temp=['proxy_price','real_price','sl_price','tl_price','commission','profit','verify','floating_loss','floating_profit']
      for(let key in val){
        if(temp.indexOf(key)!= -1){
          val[key] = this.changeNumber(val[key])
        }
      }
      
      val['trade_date'] = moment(new Date(val['trade_date'])).format('YYYY-MM-DD HH:mm:ss')

      let res ;
      
      
      if(urlRes.data && urlRes.data.msg==='success'){
          if(this.operStatus==='upd'){
              val['id'] = this.currentId
              res = await this.bll.updCard(val)
          }else{
            val['cateId'] = urlRes.data.id
            res = await this.bll.addCard(val)
            
          }

       if(res.data && res.data.msg==='success'){
            this.closeDialog() 
            this.getList() 
        }
      }
    }

  // 获取图片连接
    handleImgUrl(val){
        if(val){
          this.imgArr.push('/api/'+val)
        }
    }

    // 删除图片连接
    handleRemoveImgUrl(value){
      this.imgArr = this.imgArr.filter(item=>item!=value)
     
    }
 

    changeNumber(val){
      let temp = parseFloat(val) 
      return  temp ? temp.toFixed(2) : 0
    }

  
}
</script>
<style lang="scss">
.autoTable-template-class{
  .el-upload-dragger{
    width: 100%;
    height: 100%;
  }
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
   .search-warpper{
     .el-form-item{
       &:nth-child(2){
         .el-form-item__label{
           width: 0px  !important;
         }
       }
     }
   }
   
}
 
</style>