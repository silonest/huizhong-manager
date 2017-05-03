import Vue from 'Vue';

export default new Vue({
  data() {
    return {
      waitingCount: {}
    }
  },
  methods: {
    setWaitingCount: function(waitingCount) {
      this.waitingCount = waitingCount;
    },
    getWaitingCount: function() {
      return this.waitingCount;
    }
  }
});
