<style lang="scss" scoped>
  .answer {
    text-align: center;
  }
</style>

<template>
  <Modal
    v-model="isShow"
    title="考试结果"
    width="800">
    <div v-for="(item, index) in paper.singleQuestions" :question="item" :key="index">
      <single-item :question="item"></single-item>
      <p class="answer">你的答案：{{ practice.singleQuestions[index].answer | indexToSelection('选项') }}</p>
    </div>
    <div v-for="(item, index) in paper.mutipleQuestions" :question="item" :key="index">
      <mutiple-item :question="item"></mutiple-item>
      <p  class="answer">你的答案：{{ practice.mutipleQuestions[index].answer | mutipleAnswer }}</p>
    </div>
    <div v-for="(item, index) in paper.blankQuestions" :key="index">
      <blank-item :question="item"></blank-item>
      <p  class="answer">你的答案：{{ practice.blankQuestions[index].selections | blankAnswer }}</p>
    </div>
    <div v-for="(item, index) in paper.judgementQuestions" :key="index">
      <judgement-item :question="item"></judgement-item>
      <p  class="answer">你的答案：{{ practice.judgementQuestions[index].answer == 0 ? '否' : '是' }}</p>
    </div>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import Bus from '../bus'
import SingleItem from './paper-single-item'
import MutipleItem from './paper-mutiple-item'
import BlankItem from './paper-blank-item'
import JudgementItem from './paper-judgement-item'

export default {
  data () {
    return {
      isShow: false,
      paper: {},
      exam: {}
    }
  },

  mounted () {
    this.listenShowExamResult()
  },

  methods: {
    listenShowExamResult () {
      const self = this;
      Bus.$on('showPracticeResult', (data) => {
        self.isShow = true;
        self.paper = data.paper;
        self.practice = data.practice
      })
    }
  },

  components: {
    SingleItem,
    MutipleItem,
    BlankItem,
    JudgementItem
  }
}
</script>