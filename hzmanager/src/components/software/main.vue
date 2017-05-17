<template>
<div style="display:-webkit-flex;display:flex;flex-flow:column nowrap;min-height:100%;">
  <div style="flex:none;height:50px;"></div>
  <div style="flex:1 1 auto;display:-webkit-flex;display:flex;flex-flow:row nowrap;">
    <div class="lightgray" style="flex:none;width:320px;">
      <div class="ui compact dividing rail" style="width:320px;">
        <div id="softwareSticky" class="ui fixed top sticky" style="margin-top:50px;">
          <sw-controller v-bind:selectedSoftware="selectedSw" v-on:showNewSwMod="showCreater" v-on:showNewVerMod="showBinder" ref="controller" style="width:300px;margin: 14px 10px;"></sw-controller>
        </div>
      </div>
    </div>
    <div id="softwareContainer" style="flex:1 1 auto;">
      <sw-container v-on:selectSoftware="selectSoftware" style="margin: 14px 20px;" ref="container"></sw-container>
    </div>
  </div>
  <!-- <sw-mod-new v-on:refreshSoftwares="refreshSoftwares" ref="newSwMod"></sw-mod-new> -->
  <!-- <ver-mod-new :software="selectedSw" v-on:refreshVersions="refreshVersions" ref="newVerMod"></ver-mod-new> -->
  <sw-creater @checkSoftwareAndRefreshList="checkSoftwareAndRefreshList" @showBinder="showBinder" ref="creater"></sw-creater>
  <sw-binder v-if="selectedSw.softwareId != null" :software="selectedSw" v-on:refreshVersions="refreshVersions" ref="binder"></sw-binder>
</div>
</template>
<script>
import controller from './controller.vue';
import container from './container.vue';
import creater from './creater.vue';
import binder from './binder.vue'
// import newSwMod from './newSwMod.vue';
// import newVerMod from './newVerMod.vue';

export default {
  data() {
    return {
      selectedSw: {}
    }
  },
  components: {
    'sw-container': container,
    'sw-controller': controller,
    'sw-creater': creater,
    'sw-binder': binder
    //'ver-mod-new': newVerMod
    // 'sw-mod-new': newSwMod
  },
  methods: {
    showCreater() {
      //this.$refs.newSwMod.show();
      this.$refs.creater.show();
    },
    showBinder() {
      // this.$refs.newVerMod.show();
      this.$refs.binder.show();
    },
    selectSoftware(software) {
      this.selectedSw = software;
    },
    refreshSoftwares() {
      this.$refs.container.refreshSoftwares();
    },
    checkSoftwareAndRefreshList(softwareId) {
      this.$refs.container.refreshSoftwaresAndChoseSoftware(softwareId);
    },
    refreshVersions() {
      this.$refs.controller.refreshVersions();
    }
  },
  mounted: function() {
    $('#softwareSticky').sticky({
      offset: 50,
      pushing: true,
      context: '.container'
    });
  }
}
</script>
<style>

</style>
