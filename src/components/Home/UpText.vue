<template>
    <div class="upText-template-class">
        <el-input type='textarea' :autosize="{ minRows: 2, maxRows: 4}"  class="uploadInput"  v-model="parmas.remark" @blur="handleBlur"/>
        <div class="img-list"   v-if="srcList.length>0">
          <el-image 
             v-for="(item,index) in srcList"
             :key="index"
            style="width: 200px; height: 200px"
            :src="srcList[index]" 
            :preview-src-list="srcList">
        </el-image>
        </div>
        <div v-else class="no-data">
          没有更多图片...
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop,Watch} from 'vue-property-decorator'

import _ from 'lodash'

@Component({})
export default class UpText extends Vue{
    @Prop()
    row

    @Prop({default:false})
    status


    parmas={ 
        remark:''
     }

    // @Watch('remark')
    // handleRemark(val){
    //     this.newRemark = val 
    // }

    val=''
    srcList=[]
    imgFileUrls:any=[]
    flag:Boolean=false 

    @Watch('row')
    handleChange(val){
        this.parmas = Object.assign({},val)
        this.srcList = this.parmas['cate'].img_path 
    }

    mounted(){
        let _this = this 
         this.parmas = Object.assign({},this.row)
         this.srcList = this.parmas['cate'].img_path 
         window.jQuery(function() {
                window.jQuery('.uploadInput>textarea').focus()
                window.jQuery('.uploadInput>textarea').inlineattachment({
                allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],
                uploadUrl: '/api/upload',
                onFileUploaded: (editor, filename) => {
                    let val = editor.getValue() ?  editor.getValue() : '' ;
                    _this.flag = true 
                    _this.getInfo(val)
                 
                },
                onFileReceived: (editor, file) => {
                    _this.val = editor.getValue() ?  editor.getValue() : '';
                }
                });
            });
    }

    // 将文本和链接分开
    getInfo(txt){
      this.imgFileUrls=[]
        let tempTxt = txt 
                 // 1.找出图片链接存储起来
                    // const images = txt.match(/!\[file\]\(http(s)?:\/\/(.*?)\)((\r\n)|(\n))?/ig);
                    const images = txt.match(/(\!)?\[.*?\]\((http(s)?|ftp?|file?):\/\/(.*?)\)((\r\n)|(\n))?/ig);
                    const temp_image_map ={};
                    if (images) {
                      _.forEach(images, (v, i) => {
                        const imgurls = v.match(/http(s)?:\/\/([^\)]+)/ig);
                        const pattern = new RegExp('^http[s]?:\/\/[^\/]+(.+)$');
                        if (pattern.exec(imgurls[0])) {
                          temp_image_map['images__'+i] = imgurls[0]
                          // 2.把图片链接以映射的方式替换
                          txt = txt.replace(imgurls[0],'images__'+i)
                        }
                      });
                    }


                    // 3.给普通链接加a标签
                    // const delimiter = /(https?|file|ftp):\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9@_-](\?)?)*)*/ig;

                    const delimiter = /(https?|file|ftp):\/\/(.*?)(?=\s+)|(https?|file|ftp):\/\/(.*?)(?=\n+)|(https?|file|ftp):\/\/(.*?)(?=$)/ig

                    txt = txt.replace(delimiter,"<a href='$&' target='_blank'>$&</a>");


                      // 4.把图片链接替换回原来的样子
                      // 添加a标签后,再来替换img链接,避免a标签污染img链接
                    for(let i in temp_image_map){
                      txt = txt.replace(i,temp_image_map[i])
                    }


                     // 5.给图片链接加上img标签
               
                    if (images) {
                      _.forEach(images, (v, i) => {
                        const imgurls = v.match(/http(s)?:\/\/([^\)]+)/ig);

                        const pattern = new RegExp('^http[s]?:\/\/[^\/]+(.+)$');
                        if (pattern.exec(imgurls[0])) {

                          // txt = txt.replace(v, `<div style="width:40%"><div className='attachment-content'><div className='attachment-thumb' onclick='openMyPreview("${imgurls}")' ><img style="width:100%" }  src=${imgurls} /></div></div></div>`)

                          txt = txt.replace(v,'')

                          let newArr:any[]=[] 
                          imgurls.forEach(item=>{
                            if(item && item.indexOf('/api/')!=-1){
                              let temp = item.split('api')
                              newArr.push('/api'+temp[1])
                            }
                          })  


                          this.imgFileUrls.push(newArr[0]);
                        // imgFileUrls = newArr
                          // 把图片链接以映射的方式替换

                        }
                      });


                 }

                this.parmas['remark'] = tempTxt 
                this.flag = false 
    }

    handleBlur(){
        const { parmas,row,flag,status} = this 
        if(!flag){
            this.getInfo(parmas['remark'])
        }
        parmas['cate'] = {} 
        parmas['cate'].img_path = this.imgFileUrls
        parmas['cate'].thumb_path = this.imgFileUrls

        this.$emit('change',parmas)
    }

}

</script>
<style lang='scss'>
.upText-template-class{
    display: flex;
        flex-direction: column;
    width: 100%;
    height: 100%;
    .el-textarea{
        width: 100%;
    }
    .no-data{
      margin-top: 10px;
      height: 20px;
      line-height: 20px;
    }
}
</style>
