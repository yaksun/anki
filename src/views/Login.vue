<template>
  <div class="home">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Footer from '@/components/Footer/Footer.vue'; // @ is an alias to /src

@Component({
  components: {
    Footer,
  },
})
export default class Home extends Vue {}
</script>
