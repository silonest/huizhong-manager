<template>
<div style="display:-webkit-flex;display:flex;flex-flow:column nowrap;min-height:100%;">
  <div style="flex:none;height:50px;"></div>
  <div style="flex:1 1 auto;display:-webkit-flex;display:flex;flex-flow:row nowrap;">
    <div class="lightgray" style="flex:none;width:320px;">
      <div class="ui compact dividing rail" style="top:50px;width:320px;">
        <div class="controller ui fixed sticky">
          <user-controller style="width:300px;margin: 14px 10px;"></user-controller>
        </div>
      </div>
    </div>
    <div class="container" style="flex:1 1 auto;">
      <user-container></user-container>
    </div>
  </div>
</div>
</template>
<script>
import container from './container.vue'
import controller from './controller.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    'user-controller': controller,
    'user-container': container
  },
  mounted: function() {
    $('.controller.ui.sticky').sticky({
      offset: 50,
      context: '.container'
    });
  }
}
</script>
