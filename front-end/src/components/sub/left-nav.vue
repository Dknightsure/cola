<style lang="scss" scoped>
.layout-logo-left {
    width: 90%;
    height: 75px;
    border-radius: 3px;
    margin: 15px auto;
}

h1 {
  text-align: center;
  padding: 10px 0 0 0;
}
</style>
<template>
    <Menu :active-name="activeName" theme="dark" width="auto" :open-names="openName" v-on:on-select="go">
        <div class="layout-logo-left">
          <img src="http://www.hqu.edu.cn/images/logo.png" alt="logo">
        </div>
        <Submenu name="question">
            <template slot="title">
                <Icon type="ios-navigate"></Icon>
                试题库
            </template>
            <Menu-item name="q-single-list">单选题</Menu-item>
            <Menu-item name="q-mutiple-list">多选题</Menu-item>
            <Menu-item name="q-blank-list">填空题</Menu-item>
            <Menu-item name="q-judgement-list">判断题</Menu-item>
        </Submenu>
        <Submenu name="paper">
            <template slot="title">
                <Icon type="ios-keypad"></Icon>
                试卷管理
            </template>
            <Menu-item name="paper-list">考试卷</Menu-item>
            <Menu-item name="practice-paper-list">练习卷</Menu-item>
        </Submenu>
        <Submenu name="add">
            <template slot="title">
                <Icon type="ios-analytics"></Icon>
                添加试题
            </template>
            <Menu-item name="add-single">单选题</Menu-item>
            <Menu-item name="add-mutiple">多选题</Menu-item>
            <Menu-item name="add-blank">填空题</Menu-item>
            <Menu-item name="add-judgement">判断题</Menu-item>
        </Submenu>
    </Menu>
</template>
<script>
import NAME from '../../router/name'

export default {
  props: ['activeName', 'openName'],
  methods: {
    go (name) {
      switch (name) {
        case 'q-single-list':
          this.$router.push({
            name: NAME.SINGLE_LIST
          });
          break;
        case 'q-mutiple-list':
          this.$router.push({
            name: NAME.MUTIPLE_LIST
          });
          break;
        case 'q-blank-list':
          this.$router.push({
            name: NAME.BLANK_LIST
          });
          break;
        case 'q-judgement-list':
          this.$router.push({
            name: NAME.JUDGEMENT_LIST
          })
          break;
        case 'add-single':
          this.$router.push({
            name: NAME.ADD_SINGLE
          });
          break;
        case 'add-mutiple':
          this.$router.push({
            name: NAME.ADD_MUTIPLE
          });
          break;
        case 'add-blank':
          this.$router.push({
            name: NAME.ADD_BLANK
          });
          break;
        case 'add-judgement':
          this.$router.push({
            name: NAME.ADD_JUDGEMENT
          })
          break;
        case 'paper-list':
          this.$router.push({
            name: NAME.PAPER_LIST
          })
          break;
        case 'practice-paper-list':
          this.$router.push({
            name: NAME.PRACTICE_PAPER_LIST
          })
          break;
        default:

      }
    }
  }
}
</script>
