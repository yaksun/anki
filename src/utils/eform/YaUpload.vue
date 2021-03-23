<template>
      <el-upload
    :file-list="itemList"
    class="avatar-uploader"
      drag
       :limit="12"
      list-type="picture-card"
      :before-remove="beforeRemove"
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
import {Component,Prop} from 'vue-property-decorator'
import axios from 'axios'
@Component({})
export default class YaUpload extends Vue{
   
    @Prop({})
    itemList

     imageUrl=""
     headImgFile
    

    //  fileList= [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]

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

      beforeRemove(file, fileList) {
        this.$emit('handleRemoveImgUrl',file.url)
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

    //   // 控制上传图标隐藏
    //  get showStatus(){
    //    if(this.itemList.length+this.count===6 ){
    //       return true 
    //    }

    //    return false 
    //  }


      // get fileList(){
     
      //  let temp = []
      //   try {
      //        if(this.item.thumb_path){
      //       temp =  this.item.thumb_path.map(item=>{
      //             return {
      //             url:item 
      //             }
      //       })
      //  }
      //   } catch (error) {
          
      //   }
      //   return temp 
      // }

}
</script>
<style lang="scss">
@mixin scroll-style{
    &::-webkit-scrollbar {
          width: 4px;
    }
      &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
      }  
      &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);
      }
}
 .avatar-uploader{
   width: 65%;
   float: right;
   overflow-y: auto;
    height: 220px;
     @include scroll-style;
  &.on{
     .el-upload{
       display: none;
   }
  }
 }
  
</style>