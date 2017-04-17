<style lang="scss" scoped>
</style>
<template>
  <Row>
    <Col span="12" offset="6">
      <student-nav activeName="practice"></student-nav>
    </Col>
  </Row>
</template>
<script>
import StudentNav from '../sub/student-nav'
import $ from 'jquery'

export default {
  data () {
    return {
    }
  },

  mounted () {
    this.paperCarHide();
  },

  methods: {
    paperCarHide () {
      $('.container-paper-car').hide()
    },
  },
  
  components: {
    StudentNav
  }
}
</script>
