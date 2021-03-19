<template>
    <div class="login-template-class" >
       <div class="login-warpper" >
            <h2>Log</h2>
              <ya-form :options="options" class="autoForm-template-class" :params="val">
             <el-form-item class="oper-btn">
                    <el-button  type="primary" @click="onSubmit" :disabled="options.initStatus">登录</el-button>
                    <el-button  type="primary" @click="onCancel" >取消</el-button>
             </el-form-item>
        </ya-form>
       </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {ProfileServices} from '@/bll/profile/ProfileServices'
import YaForm from '@/utils/eform/YaForm.vue'

@Component({
  components:{
    YaForm
  }
})
export default class   Login  extends Vue{
    bll = new ProfileServices()
    token:any=''
    val={}

    private options={
            inlineStatus:false,
            labelWidth:'80px',
            ruleForm:{},
            columns:[
                // 当为必选时要加prop
                {label:'用户名',field:'username',prop:'username',desc:'请输入姓名',type:'input',clearable:true},
                {label:'密码',field:'password',prop:'password',desc:'请输入密码',type:'input',showPassword:true}
             
            ],
            initStatus:true
           
        }

        created(){
            let temp={} 
            this.options.columns.forEach(item=>{
                temp[item.field]=''
            })
            this.options.ruleForm = temp
        }

    
    initStatus:boolean = false 
  $router: any

    async onSubmit(){
     
      let _this = this 
     const res = await this.bll.dologin({...this.options.ruleForm})
      if(res.code === 200 && res.data.data && res.data.data.accessToken){
        window.sessionStorage.setItem('token',res.data.data.accessToken)
        _this.$router.push('/home')
     
      }else{
        _this.$message(res.data.message)
      }
     
    }


    onCancel(){

    }

    mounted() {
     this.token =  sessionStorage.getItem('token') || ''
    }
}
</script>
<style lang="scss">
    .login-template-class{
        height: 100vh;
        position: relative;
        .login-warpper{
                width: 90%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-60%);
                h2{
                    text-align: center;
                    margin-bottom: 15px;
                }

        }
        .oper-btn{
          .el-form-item__content{
            margin-left: 0  !important;
            text-align: center;
            .el-button{
              width:160px;
            }
          }
        }
    }

    
</style>