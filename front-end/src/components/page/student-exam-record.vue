<style lang="scss" scoped>
.s-paper-table {
  margin: 20px 0 0 0;
}
</style>

<template>
  <Row>
    <Col span="12" offset="6">
      <student-nav activeName="exam-record"></student-nav>
      <Table border :context="self" :columns="head" :data="data" class="s-paper-table"></Table>
    </Col>
  </Row>
</template>

<script>
import StudentNav from '../sub/student-nav'
import $ from 'jquery'
import PaperIO from '../../io/PaperIO'

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
            title: '考试提交时间',
            key: 'date'
        },
        {
            title: '类型',
            key: 'makeup'
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
    this.fetchData();
    this.paperCarHide();
  },

  methods: {
    fetchData () {
      const self = this;
      const user = USER;
      self.data = [];
      new PaperIO().getExam({user}).then(res => {
        res.data.forEach(function(exam){
          let tmp = {};
          tmp.name = exam.name;
          tmp.date = new Date(exam.date);
          tmp.paperId = exam.paperId;
          tmp.makeup = exam.makeup == 0 ? '普通考试': '补考';
          tmp.examId = exam._id
          self.data.push(tmp);
        })
      }).catch(err => {
        self.$Message.error('获取考试记录失败！')
      })
    },

    show (index) {
      console.log(index)
    },

    paperCarHide () {
      $('.container-paper-car').hide()
    },
  },

  components: {
    StudentNav
  }
}
</script>