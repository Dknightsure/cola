<style lang="scss" scoped>
.s-paper-table {
  margin: 20px 0 0 0;
}
</style>

<template>
  <Row>
    <Col span="12" offset="6">
      <student-nav activeName="practice-record"></student-nav>
      Practice Record
    </Col>
  </Row>
</template>

<script>
import StudentNav from '../sub/student-nav'
import $ from 'jquery'

export default {
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