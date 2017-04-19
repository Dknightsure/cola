<style lang="scss" scoped>
.s-paper-table {
  margin: 20px 0 0 0;
}
</style>
<template>
  <Row>
    <Col span="12" offset="6">
      <student-nav activeName="practice"></student-nav>
      <Table border :context="self" :columns="head" :data="data" class="s-paper-table"></Table>
    </Col>
  </Row>
</template>
<script>
import StudentNav from '../sub/student-nav'
import NAME from '../../router/name'
import $ from 'jquery'
import PaperIO from '../../io/PaperIO'
import moment from 'moment'

export default {
  data () {
    return {
      self: this,
      paperIndex: 0,
      head: [
        {
            title: '练习名称',
            key: 'name',
            render (row, column, index) {
                return `<Icon type="document-text"></Icon> <strong>${row.name}</strong>`;
            }
        },
        {
            title: '创建时间',
            key: 'date'
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render (row, column, index) {
                return `<i-button type="primary" size="small" @click="enter(${index})">参加练习</i-button>`;
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
      self.data = []
      new PaperIO().getPracticeList().then(res => {
        let practiceList = res.data;
        for(let i = 0; i < practiceList.length; i++){
          let practice = {};
          practice.name = practiceList[i].name;
          practice.date = moment(practiceList[i].date).local().format("dddd, MMMM Do YYYY, h:mm:ss a");
          practice._id = practiceList[i]._id;
          self.data.push(practice);
        }
      }).catch(err => {
        self.$Message.error('获取考试记录列表失败！')
      })
    },

    paperCarHide () {
      $('.container-paper-car').hide()
    },

    enter (index) {
      this.$router.push({
        name: NAME.STUDENT_PRACTICE,
        params: {
          paperId: this.data[index]._id
        }
      })
    }
  },
  
  components: {
    StudentNav
  }
}
</script>
