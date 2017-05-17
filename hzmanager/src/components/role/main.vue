<template>
<div style="display:-webkit-flex;display:flex;flex-flow:column nowrap;min-height:100%;">
  <div style="flex:none;height:50px;"></div>
  <div style="flex:1 1 auto;display:-webkit-flex;display:flex;flex-flow:row nowrap;">
    <div class="lightgray" style="flex:none;width:320px;">
      <div class="ui compact dividing rail" style="width:320px;">
        <div id="roleSticky" class="ui fixed sticky" style="margin-top:50px;">
          <role-controller v-bind:selectedRole="selectedRole" v-on:showNewRoleMod="showNewRoleMod" style="width:300px;margin: 14px 10px;"></role-controller>
        </div>
      </div>
    </div>
    <div id="roleContainer" style="flex:1 1 auto;">
      <role-container v-on:selectRole="selectRole" ref="container"></role-container>
    </div>
  </div>
  <role-creater v-on:refreshRoles="refreshRoles" ref="newRoleMod"></role-creater>
</div>
</template>
<script>
import controller from './controller.vue';
import container from './container.vue';
import creater from './creater.vue';

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
    'role-creater': creater
  },
  mounted() {
    $('#roleSticky').sticky({
      offset: 50,
      pushing: true,
      context: '.container'
    });
  }
}
</script>
