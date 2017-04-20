<style lang="scss" scoped>
.s-paper-table {
  margin: 20px 0 0 0;
}
</style>

<template>
  <Row>
    <Col span="12" offset="6">
      <student-nav activeName="exam"></student-nav>
      <Table border :context="self" :columns="head" :data="data" class="s-paper-table"></Table>
      <Modal
        v-model="isModalVisible"
        title="确认框"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>你确认要进行考试吗？考试中途不能退出哦!</p>
      </Modal>
    </Col>
  </Row>
</template>

<script>
import NAME from '../../router/name'
import StudentNav from '../sub/student-nav'
import PaperIO from '../../io/PaperIO'
import $ from 'jquery'
import moment from 'moment'

export default {
  data () {
    return {
      self: this,
      isModalVisible: false,
      paperIndex: 0,
      head: [
        {
            title: '试卷名称',
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
                return `<i-button type="primary" size="small" @click="enter(${index})">参加考试</i-button>`;
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
      self.data = []
      new PaperIO().getExamList({user:USER}).then(res => {
        let paperList = res.data;
        for(let i = 0; i < paperList.length; i++){
          let paper = {};
          paper.name = paperList[i].name;
          paper.date = moment(paperList[i].date).local().format("dddd, MMMM Do YYYY, h:mm:ss a")
          paper._id = paperList[i]._id;
          self.data.push(paper);
        }
      }).catch(err => {
        self.$Message.error('获取考试记录列表失败！')
      })
    },

    paperCarHide () {
      $('.container-paper-car').hide()
    },

    enter (index) {
      this.paperIndex = index;
      this.isModalVisible = true;
    },

    ok () {
      this.$router.push({
        name: NAME.STUDENT_EXAM,
        params: {
          paperId: this.data[this.paperIndex]._id
        }
      })
    },

    cancel () {
      this.isModalVisible = false;
    }
  },

  components: {
    StudentNav
  }
}
</script>
