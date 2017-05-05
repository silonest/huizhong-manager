<template>
<div style="display:-webkit-flex;display:flex;flex-flow:column nowrap;min-height:100%;">
  <div style="flex:none;height:50px;"></div>
  <div style="flex:1 1 auto;display:-webkit-flex;display:flex;flex-flow:row nowrap;">
    <div class="lightgray" style="flex:none;width:320px;">
      <div class="ui compact dividing rail" style="width:320px;">
        <div class="software controller ui fixed sticky" style="margin-top:50px;">
          <role-controller v-bind:selectedRole="selectedRole" v-on:showNewRoleMod="showNewRoleMod" style="width:300px;margin: 14px 10px;"></role-controller>
        </div>
      </div>
    </div>
    <div class="container" style="flex:1 1 auto;">
      <role-container v-on:selectRole="selectRole" ref="container"></role-container>
    </div>
  </div>
  <role-mod-new v-on:refreshRoles="refreshRoles" ref="newRoleMod"></role-mod-new>
</div>
</template>
<script>
import controller from './controller.vue';
import container from './container.vue';
import newRoleMod from './newRoleMod.vue';

export default {
  data() {
    return {
      selectedRole: {}
    }
  },
  methods: {
    selectRole: function(role) {
      this.selectedRole = role;
    },
    showNewRoleMod: function() {
      this.$refs.newRoleMod.show();
    },
    refreshRoles: function() {
      this.$refs.container.refresh();
    }
  },
  components: {
    'role-controller': controller,
    'role-container': container,
    'role-mod-new': newRoleMod
  }
}
</script>
