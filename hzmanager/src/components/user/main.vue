<template>
<div style="display:-webkit-flex;display:flex;flex-flow:column nowrap;min-height:100%;">
  <div style="flex:none;height:50px;"></div>
  <div style="flex:1 1 auto;display:-webkit-flex;display:flex;flex-flow:row nowrap;">
    <div class="lightgray" style="flex:none;width:320px;">
      <div class="ui compact dividing rail" style="width:320px;">
        <div class="user controller ui fixed sticky" style="margin-top:50px;">
          <user-controller style="width:300px;margin: 14px 10px;" v-on:showNewUserMod="showNewUserMod"></user-controller>
        </div>
      </div>
    </div>
    <div class="container" style="flex:1 1 auto;">
      <user-container v-on:showEditUserMod="showEditUserMod" ref="container"></user-container>
    </div>
  </div>
  <user-mod-new ref="newUserMod"></user-mod-new>
  <user-mod-edit v-bind:user="selectedUser" v-on:refreshUsers="refreshUsers" ref="editUserMod"></user-mod-edit>
</div>
</template>
<script>
import container from './container.vue';
import controller from './controller.vue';
import newUserMod from './newUserMod.vue';
import editUserMod from './editUserMod.vue';
export default {
  data() {
    return {
      selectedUser: {}
    }
  },
  components: {
    'user-controller': controller,
    'user-container': container,
    'user-mod-new': newUserMod,
    'user-mod-edit': editUserMod
  },
  methods: {
    showNewUserMod() {
      this.$refs.newUserMod.show();
    },
    showEditUserMod(user) {
      this.selectedUser = user;
      this.$refs.editUserMod.show();
    },
    refreshUsers(){
      alert(1);
      this.$refs.container.fillTable();
    }
  },
  mounted: function() {
    $('.user.controller.ui.sticky').sticky({
      offset: 50,
      context: '.container'
    });
  }
}
</script>
