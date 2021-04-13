<template>
    <div class="upText-template-class">
         <el-image 
            style="width: 200px; height: 200px"
            :src="srcList[0]" 
            :preview-src-list="srcList">
        </el-image>
        <el-input type='textarea' v-model="remark"/>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'

@Component({})
export default class UpText extends Vue{
    @Prop()
    cate  

    @Prop()
    remark

    val=''
    srcList=['https://www.baidu.com/img/flexible/logo/pc/result.png']

    mounted(){
        console.log(this.remark);
    }

}

</script>
<style lang='scss'>
.upText-template-class{
    display: flex;
    .el-textarea{
        width:400px;
    }
}
</style>
