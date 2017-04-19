<style lang="scss" scoped>
.s-paper-table {
  margin: 20px 0 0 0;
}
</style>

<template>
  <Row>
    <Col span="12" offset="6">
      <student-nav activeName="practice-record"></student-nav>
      <Table border :context="self" :columns="head" :data="data" class="s-paper-table"></Table>
    </Col>
    <practice-result></practice-result>
  </Row>
</template>

<script>
import StudentNav from '../sub/student-nav'
import $ from 'jquery'
import PaperIO from '../../io/PaperIO'
import PracticeResult from '../sub/practice-result'
import Bus from '../bus'
import moment from 'moment'

export default {
  data () {
    return {
      self: this,
      head: [
        {
            title: '试卷名称',
            key: 'name',
            render (row, column, index) {
                return `<Icon type="document-text"></Icon> <strong>${row.name}</strong>`;
            }
        },
        {
            title: '练习提交时间',
            key: 'date'
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render (row, column, index) {
                return `<i-button type="primary" size="small" @click="show(${index})">查看结果</i-button>`;
            }
        }
      ],
      data: []
    }
  },

  mounted () {
    this.paperCarHide();
    this.fetchData()
  },

  methods: {
    fetchData () {
      const self = this;
      const user = USER;
      self.data = [];
      new PaperIO().getPracticeRecord({user}).then(res => {
        res.data.forEach(function(practice){
          let tmp = {};
          tmp.name = practice.name;
          tmp.date = moment(practice.date).local().format("dddd, MMMM Do YYYY, h:mm:ss a");
          tmp.paperId = practice.paperId;
          tmp.practiceId = practice._id
          self.data.push(tmp);
        })
      }).catch(err => {
        self.$Message.error('获取考试记录失败！')
      })
    },

    show (index) {
      const self = this
      const record = this.data[index]
      new PaperIO().getPracticeResult({
        paperId: record.paperId,
        practiceId: record.practiceId
      }).then(res => {
        console.log(res.data);
        Bus.$emit('showPracticeResult', res.data)
      }, err => {
        self.$Message.error('获取考试详情失败！')
      })
    },

    paperCarHide () {
      $('.container-paper-car').hide()
    },
  },

  components: {
    StudentNav,
    PracticeResult
  }
}
</script>