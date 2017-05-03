<template>
<div id="ui segment">
  <!--导航栏-->
  <div class="ui breadcrumb">
    <div class="section"><span style="color:#584B4F;"><i class="circular home icon"></i></span></div>
    <i class="right arrow icon divider"></i>
    <div class="active section"><span style="color:#584B4F;">角色管理</span></div>
  </div>
  <!--角色管理提示-->
  <div class="ui info message">
    <div class="header">角色管理</div>
    <p>角色管理功能可以帮助您维护服务平台的软件，在该页您可以增加，停用软件。</p>
    <div class="fluid ui buttons">
      <div class="ui button" @click="showNewSwMod()">新增角色</div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
