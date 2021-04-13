<template>
  <div>
    <el-input 
    v-model="value" 
    :id="item.field"
    :type="item.type"
    :autosize="item.autosize"
    :placeholder="item.desc" 
    :disabled="item.disabled"
    :clearable="item.clearable"
    :show-password="item.showPassword"
    >
    </el-input>
         <el-image 
        v-if="item.type==='textarea'"
        style="width: 100px; height: 100px"
        :src="url[0]" 
        :preview-src-list="url">
    </el-image>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop,Watch} from 'vue-property-decorator'

@Component({})
export default class YaInput extends Vue{
    @Prop()
    private item

     @Prop()
    private val

    
    value="" 
    url=['https://www.baidu.com/img/flexible/logo/pc/result.png']

    created(){
        this.value = this.val
        
    }


      mounted(){
          let _this = this 
         if(this.item.type==='textarea'){
                this.value="<img src='https://www.baidu.com/img/flexible/logo/pc/result.png'/>"
            //     window.jQuery(function() {
            //     window.jQuery('textarea').inlineattachment({
            //     allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],
            //     uploadUrl: '/api/upload',
            //     onFileUploaded: (editor, filename) => {
            //          _this.value = editor.getValue();
            //         // const fieldkey = editor.getAttr('id').substr(15);
            //         // self.state.values[fieldkey] = editor.getValue();
            //         // delete self.state.errors[fieldkey];
            //         // self.setState({ values: self.state.values });
            //     },
            //     onFileReceived: (editor, file) => {
            //         const fieldkey = editor.getAttr('id');
            //         // self.state.values[fieldkey] = editor.getValue();
            //         // delete self.state.errors[fieldkey];
            //         // self.setState({ values: self.state.values });
            //         _this.value = editor.getValue();
            //     }
            //     });
            // });
         }
    }

   


    @Watch('value')
    handleChange(val): void{
        this.$emit('handleChange',val,this.item.field)
    }
}
</script>