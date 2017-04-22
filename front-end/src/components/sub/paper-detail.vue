<style lang="scss" scoped>
  
</style>

<template>
  <Modal
    v-model="isShow"
    title="试卷详情"
    width="800">
    <single-item v-for="(item, index) in paper.singleQuestions" :question="item" :key="index"></single-item>
    <mutiple-item v-for="(item, index) in paper.mutipleQuestions" :question="item" :key="index"></mutiple-item>
    <blank-item v-for="(item, index) in paper.blankQuestions" :question="item" :key="index"></blank-item>
    <judgement-item v-for="(item, index) in paper.judgementQuestions" :question="item" :key="index"></judgement-item>
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
      paper: {}
    }
  },

  mounted () {
    this.listenShowPaperDetail()
  },

  methods: {
    listenShowPaperDetail () {
      const self = this;
      Bus.$on('showPaperDetail', (paper) => {
        self.isShow = true;
        self.paper = paper;
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