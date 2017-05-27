<template>
<div class="full compact">
  <login-form></login-form>
  <login-back></login-back>
</div>
</template>
<script>
import form from './form.vue';
import back from './back.vue';
export default {
  data() {
    return {}
  },
  components: {
    'login-form': form,
    'login-back': back
  }
}
</script>
