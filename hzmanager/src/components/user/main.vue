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
  <user-creater ref="newUserMod" v-on:refreshUsers="refreshUsers"></user-creater>
  <user-editer v-bind:user="selectedUser" v-on:refreshUsers="refreshUsers" ref="editUserMod"></user-editer>
</div>
</template>
<script>
import container from './container.vue';
import controller from './controller.vue';
import creater from './creater.vue';
import editer from './editer.vue';
export default {
  data() {
    return {
      selectedUser: {}
    }
  },
  components: {
    'user-controller': controller,
    'user-container': container,
    'user-creater': creater,
    'user-editer': editer
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
