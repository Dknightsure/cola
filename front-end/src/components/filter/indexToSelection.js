import Vue from 'vue'

Vue.filter('indexToSelection', (index, suffix) => {
  return suffix + ' ' + String.fromCharCode(index + 65);
})

Vue.filter('mutipleAnswer', (arr) => {
  var res = []
  arr.forEach(ele => {
    res.push('选项 ' + String.fromCharCode(ele + 65));
  })

  return res.join(', ')
})

Vue.filter('blankAnswer', (arr) => {
  var res = []
  arr.forEach(ele => {
    res.push(ele.title)
  })

  return res.join(', ')
})