<template>
<div id="ui segment">
  <div class="ui breadcrumb">
    <div class="section"><span style="color:#584B4F;"><i class="circular home icon"></i></span></div>
    <i class="right arrow icon divider"></i>
    <div class="active section"><span style="color:#584B4F;">用户管理</span></div>
  </div>
  <div class="ui info message">
    <div class="header">用户管理</div>
    <p>用户管理功能可以帮助您管理平台的用户。</p>
    <div class="fluid ui buttons">
      <div class="ui button" @click="showNewUserMod()">新增用户</div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    showNewUserMod(){
      this.$emit('showNewUserMod');
    }
  }
}
</script>
