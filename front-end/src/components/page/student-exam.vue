<style lang="scss" scoped>
  h1 {
    text-align: center;
    margin: 20px 0;
  }

  .question-item {
    margin: 0 0 20px 0;
  }
</style>

<template>
  <Row>
    <Col span="12" offset="6">
      <h1>{{ paper.name }}</h1>
      <single-item v-for="(question, index) in paper.singleQuestions" :question="question" :key="index" class="question-item"></single-item>
      <mutiple-item v-for="(question, index) in paper.mutipleQuestions" :question="question" :key="index" class="question-item"></mutiple-item>
      <blank-item v-for="(question, index) in paper.blankQuestions" :question="question" :key="index" class="question-item"></blank-item>
      <Button type="primary" long>提交答案</Button>
    </Col>
  </Row>
</template>

<script>
import PaperIO from '../../io/PaperIO'
import SingleItem from '../sub/exam-single-item'
import MutipleItem from '../sub/exam-mutiple-item'
import BlankItem from '../sub/exam-blank-item'
import $ from 'jquery'

export default {
  data () {
    return {
      paperId: '',
      paper: {}
    }
  },

  mounted () {
    this.paperId = this.$route.params.paperId
    this.fetchData()
    this.paperCarHide();
  },

  methods: {
    fetchData () {
      const self = this;
      const id = this.paperId
      new PaperIO().getDetail({id}).then(res => {
        self.paper = res.data;
      }).catch(err => {
        this.$Message.error('获取试卷详情失败！')
      })
    },

    paperCarHide () {
      $('.container-paper-car').hide()
    },
  },

  components: {
    SingleItem,
    MutipleItem,
    BlankItem
  }
}
</script>