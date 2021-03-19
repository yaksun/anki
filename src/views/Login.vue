<template>
    <div class="login-template-class" >
       <div class="login-warpper" >
            <h2>ANKI</h2>
            <el-form  :model="ruleForm" :rules="rules" label-width="100px" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :disabled="initStatus">登录</el-button>
                    <el-button type="primary" @click="onCancel" :disabled="initStatus">取消</el-button>
                </el-form-item>
            </el-form>
       </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {ProfileServices} from '@/bll/profile/ProfileServices'

@Component({})
export default class   Login  extends Vue{
    bll = new ProfileServices()
    token:any=''
      validateUsernam = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          
          callback();
        }
      }

       validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      }

     rules:object ={
          username: [
            { required: true, validator: this.validateUsernam, trigger: 'blur' }
          ],
          password: [
            { required: true, validator: this.validatePassword, trigger: 'blur' }
          ]
        }

      ruleForm:object={
        username:'',
        password:''
    }

    initStatus:boolean = false 
  $router: any

    async onSubmit(){
     
      let _this = this 
     const res = await this.bll.dologin({...this.ruleForm})
      if(res.code === 200 && res.data.data && res.data.data.accessToken){
        window.sessionStorage.setItem('token',res.data.data.accessToken)
        _this.$router.push('/home')
        _this.ruleForm={
        username:'',
        password:''
     }
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
    }

    @media only screen and (max-width: 500px){
      .category-template-list{
        .el-dialog{
          width: 80%  !important;
        }
      }
    }
</style>