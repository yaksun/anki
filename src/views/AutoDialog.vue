<template>
    <ya-dialog>
    </ya-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

import YaDialog from '@/utils/edialog/YaDialog.vue'
import AutoForm from '@/views/AutoForm.vue'

@Component({
    components:{
        YaDialog,
        AutoForm
    }
})
export default class AutoDialog extends Vue{

}
</script>