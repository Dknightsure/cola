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

export default {
  data () {
    return {
    }
  },
  
  components: {
    StudentNav
  }
}
</script>
