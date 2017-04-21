<style lang="scss" scoped>
  h1 {
    text-align: center;
    margin: 20px 0;
  }

  .question-item {
    margin: 0 0 20px 0;
  }

  .count-down {
    float: left;
  }
</style>

<template>
  <Row>
    <Col span="12" offset="6">
      <h1>{{ paper.name }}</h1>
      <count-down :date="paper.time" v-on:timeDown="ok"></count-down>
      <single-item v-for="(question, index) in paper.singleQuestions" :question="question" :key="index" class="question-item"></single-item>
      <mutiple-item v-for="(question, index) in paper.mutipleQuestions" :question="question" :key="index" class="question-item"></mutiple-item>
      <blank-item v-for="(question, index) in paper.blankQuestions" :question="question" :key="index" class="question-item"></blank-item>
      <Button type="primary" long @click="isModalVisible = true">提交答案</Button>
    </Col>
    <Modal
      v-model="isModalVisible"
      title="确认框"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>你确定要提交吗？</p>
    </Modal>
  </Row>
</template>

<script>
import PaperIO from '../../io/PaperIO'
import SingleItem from '../sub/exam-single-item'
import MutipleItem from '../sub/exam-mutiple-item'
import BlankItem from '../sub/exam-blank-item'
import $ from 'jquery'
import utils from '../../utils'
import _ from 'lodash'
import CountDown from '../sub/count-down'
import NAME from '../../router/name'

export default {
  data () {
    return {
      paperId: '',
      isModalVisible: false,
      originalPaper: {},
      paper: {}
    }
  },

  watch: {
    originalPaper: function(val, oldVal) {
      const paper = utils.clone(val)
      if(!_.isEmpty(paper)){
        for (let i = 0; i < paper.singleQuestions.length; i++) {
          paper.singleQuestions[i].answer = 0;
        }

        for (let i = 0; i < paper.mutipleQuestions.length; i++) {
          paper.mutipleQuestions[i].answer = [0];
        }

        for (let i = 0; i < paper.blankQuestions.length; i++) {
          for (let j = 0; j < paper.blankQuestions[i].selections.length; j++) {
            paper.blankQuestions[i].selections[j].title = '';
          }
        }

        this.paper = paper
      }
    }
  },

  computed: {
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
        self.originalPaper = res.data;
      }).catch(err => {
        this.$Message.error('获取试卷详情失败！')
      })
    },

    paperCarHide () {
      $('.container-paper-car').hide()
    },

    ok () {
      console.log(this.paper);
      const self = this;
      new PaperIO().addExam(this.paper).then(res => {
        self.$Message.success('提交成功！')
        self.$router.push({
          name: NAME.STUDENT_EXAM_LIST
        })
      }, err => {
        self.$Message.error('提交失败！')
      })
    },

    cancel () {
      this.isModalVisible = false;
      this.$Message.info('取消提交成功！')
    }
  },

  components: {
    SingleItem,
    MutipleItem,
    BlankItem,
    CountDown
  }
}
</script>