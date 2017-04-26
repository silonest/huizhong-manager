<template>
<div class="ui icon message" :class="message.status" style="position: absolute; width:400px;z-index:9999" v-show="message.status != ''">
  <i class="close icon" v-on:click="close($event)" ref="close"></i>
  <i class="check icon"></i>
  <div class="content">
    <p>{{message.content}}</p>
  </div>
</div>
</template>
<script>
import {
  message
} from './message.js'
export default {
  data() {
    return {
      message: {
        status: '',
        title: '',
        content: ''
      }
    }
  },
  methods: {
    close(event) {
      event.target.closest('.message').fadeOut();
    }
  },
  mounted: function() {
    message.$on('show', (status, title, content) => {
      this.message.status = status;
      this.message.title = title;
      this.message.content = content;
      setTimeout(() => {
        this.$refs.close.click();
        this.message = {
          status: '',
          title: '',
          content: ''
        };
      }, 1000 * 3);
    })

  }
}
</script>
