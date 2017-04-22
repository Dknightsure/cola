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
      <Alert :type="exam.singleQuestions[index].result ? 'success': 'error'" show-icon>
        <span slot="desc">你的答案：{{ exam.singleQuestions[index].answer | indexToSelection('选项') }}</span>
      </Alert>
    </div>
    <div v-for="(item, index) in paper.mutipleQuestions" :question="item" :key="index">
      <mutiple-item :question="item"></mutiple-item>
      <Alert :type="exam.mutipleQuestions[index].result ? 'success': 'error'" show-icon>
        <span slot="desc">你的答案：{{ exam.mutipleQuestions[index].answer | mutipleAnswer }}</span>
      </Alert>
    </div>
    <div v-for="(item, index) in paper.blankQuestions" :key="index">
      <blank-item :question="item"></blank-item>
      <Alert :type="exam.blankQuestions[index].result ? 'success': 'error'" show-icon>
        <span slot="desc">你的答案：{{ exam.blankQuestions[index].selections | blankAnswer }}</span>
      </Alert>
    </div>
    <div v-for="(item, index) in paper.judgementQuestions" :key="index">
      <blank-item :question="item"></blank-item>
      <Alert :type="exam.judgementQuestions[index].result ? 'success': 'error'" show-icon>
        <span slot="desc">你的答案：{{ exam.judgementQuestions[index].answer == 0 ? '否' : '是' }}</span>
      </Alert>
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
      Bus.$on('showExamResult', (data) => {
        self.isShow = true;
        self.paper = data.paper;
        self.exam = data.exam
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