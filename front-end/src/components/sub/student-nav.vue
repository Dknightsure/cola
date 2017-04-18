<style lang="scss" scoped>
</style>

<template>
  <Row>
    <Menu mode="horizontal" theme="light" :active-name="activeName" @on-select="go">
      <Menu-item name="exam">
          <Icon type="ios-paper"></Icon>
          考试
      </Menu-item>
      <Menu-item name="practice">
          <Icon type="ios-paper-outline"></Icon>
          练习
      </Menu-item>
      <Menu-item name="exam-record">
          <Icon type="ios-list"></Icon>
          我的考试记录
      </Menu-item>
      <Menu-item name="practice-record">
          <Icon type="ios-list-outline"></Icon>
          我的练习记录
      </Menu-item>
    </Menu>
  </Row>
</template>

<script>
import NAME from '../../router/name'

export default {
  data () {
    return {
    }
  },

  props: ['activeName'],

  methods: {
    go (name) {
      switch (name) {
        case 'exam':
          this.$router.push({
            name: NAME.STUDENT_EXAM_LIST
          })
          break;
        case 'practice':
          this.$router.push({
            name: NAME.STUDENT_PRACTICE_LIST
          })
          break;
        case 'exam-record':
          this.$router.push({
            name: NAME.EXAM_RECORD
          })
          break;
        case 'practice-record':
          this.$router.push({
            name: NAME.PRACTICE_RECORD
          })
          break;
        default:
          break;
      }
    }
  }
}
</script>
