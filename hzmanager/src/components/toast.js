import Vue from 'vue';
import toaster from '../../toast/dist/jquery.toast.min.js'

export var toast = new Vue({
  methods: {
    success: function(content) {
      $.toast({
        heading: '成功',
        text: content,
        icon: 'success',
        showHideTransition: 'fade', // It can be plain, fade or slide
        bgColor: '#40A977', // Background color for toast
        textColor: '#eee', // text color
        textAlign: 'left', // Alignment of text i.e. left, right, center
        position: 'bottom-right' // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
      })
    },
    error: function(content) {
      $.toast({
        heading: '失败',
        text: content,
        icon: 'error',
        showHideTransition: 'fade', // It can be plain, fade or slide
        bgColor: '#40A977', // Background color for toast
        textColor: '#eee', // text color
        textAlign: 'left', // Alignment of text i.e. left, right, center
        position: 'bottom-right' // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
      })
    },
    info: function(content) {
      $.toast({
        heading: '成功',
        text: content,
        icon: 'info',
        showHideTransition: 'fade', // It can be plain, fade or slide
        bgColor: '#40A977', // Background color for toast
        textColor: '#eee', // text color
        textAlign: 'left', // Alignment of text i.e. left, right, center
        position: 'bottom-right' // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
      })
    }
  }
});
