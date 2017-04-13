import Vue from 'vue'

Vue.filter('indexToSelection', (index, suffix) => {
  return suffix + ' ' + String.fromCharCode(index + 65);
})
