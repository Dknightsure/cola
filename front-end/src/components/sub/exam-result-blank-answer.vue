<template>
  <Alert :type="showWhat" show-icon>
    <span slot="desc">你的答案：{{ selections | blankAnswer }}</span>
  </Alert>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  computed: {
    showWhat: function () {
      function AllRight(result){
        return result === true;
      }

      function AllWrong(result){
        return result === false;
      }

      if(this.results.every(AllRight) === true){
        return 'success';
      }else if(this.results.every(AllWrong) === true){
        return 'error';
      }else{
        return 'warning'
      }
    }
  },

  props: ['results', 'selections'],
}
</script>