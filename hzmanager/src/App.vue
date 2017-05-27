<template>
<!-- <keep-alive v-if="waitingCount.licenceCount != null || waitingCount.passCount != null"> -->
<router-view id="app"></router-view>
<!-- </keep-alive> -->
</template>
<script>
export default {
  name: 'app',
  data() {
    return {}
  }
}
</script>
<style>
@import '../semantic/dist/semantic.min.css';
@import '../toast/dist/jquery.toast.min.css';
@import './assets/css/style.css';
</style>
