<template>
    <el-upload
    class="avatar-uploader"
      drag
      list-type="picture-card"
    action="none"
    :auto-upload="false"
    :on-change="checkType"
    accept="image/jpeg,image/png,image/jpg"
   >
 
    <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import axios from 'axios'
@Component({})
export default class YaUpload extends Vue{
    

    private imageUrl=""
    private headImgFile
   

     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      }
      
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }


      checkType(file,fileList){
        let fileType = file.name.substring(file.name.lastIndexOf('.')+1);
        fileList=[] 
        if(fileType!=='jpeg' && fileType!=='jpg' && fileType!='png'){
             this.$message.error('上传图片格式不正确!');
             return false
        }
         const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false
        }

        this.headImgFile = file 
        this.imageUrl = URL.createObjectURL(this.headImgFile.raw)
        this.submitFile()
      }


     async submitFile(){
       let _this =this 
        let formData = new FormData(); 
        formData.append('file',this.headImgFile.raw)
       await axios({
          method:'post',
          url:'/api/upload',
          data:formData
        }).then(res=>{
         if(res.data && res.data.code===200){
           _this.$emit('handleImgUrl',res.data.path)
         }
        }).catch(err=>{
          console.log(err);
          
        })
      }
}
</script>
<style>
 .avatar-uploader{
   width: 50%;
   float: right;
 }
  
</style>