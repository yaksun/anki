<template>
    <el-input 
    v-model="value" 
    :type="item.type"
    :autosize="item.autosize"
    :placeholder="item.desc" 
    :disabled="item.disabled"
    :clearable="item.clearable"
    :show-password="item.showPassword"
    ></el-input>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop,Watch} from 'vue-property-decorator'
import $ from 'jquery'

@Component({})
export default class YaInput extends Vue{
    @Prop()
    private item

     @Prop()
    private val

    @Prop() 
    private type 
    
    value="" 

    created(){
        this.value = this.val
      
    }
    mounted(){
        if(this.type==='textarea'){
              $(function() {
                $('textarea').inlineattachment({
                allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],
                uploadUrl: '/api/project/file',
                onFileUploaded: (editor, filename) => {
                    const fieldkey = editor.getAttr('id').substr(15);
                    // self.state.values[fieldkey] = editor.getValue();
                    // delete self.state.errors[fieldkey];
                    // self.setState({ values: self.state.values });
                },
                onFileReceived: (editor, file) => {
                    const fieldkey = editor.getAttr('id').substr(15);
                    // self.state.values[fieldkey] = editor.getValue();
                    // delete self.state.errors[fieldkey];
                    // self.setState({ values: self.state.values });
                }
                });
            });
        }
    }


    @Watch('value')
    handleChange(val): void{
        this.$emit('handleChange',val,this.item.field)
    }
}
</script>