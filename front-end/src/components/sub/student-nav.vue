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
          <Icon type="ios-people"></Icon>
          练习
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
        default:
          break;
      }
    }
  }
}
</script>
