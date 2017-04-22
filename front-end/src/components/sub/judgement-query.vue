<style lang="scss" scoped>
.option-item {
  position: relative;
}

.icon-delete {
  position: absolute;
  left: -70px;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  cursor: pointer;
}

.option-item:hover {
  .icon-delete {
    display: inline-block;
  }
}

.container {
  margin: 20px 0 0 0;
}
</style>
<template>
  <Row class="container">
    <Col span="8" offset="8">
      <Card>
        <Form :model="question" :label-width="80" class="container">
          <Form-item label="题目标题">
            {{ question.title }}
          </Form-item>
          <Form-item label="题目难度">
              <Rate allow-half disabled v-model="question.difficulty"></Rate>
          </Form-item>
          <Form-item label="正确答案">
              {{ question.answer == 0 ? '否' : '是' }}
          </Form-item>
          <Form-item>
              <Button type="primary" @click="alter">修改</Button>
              <Button type="error" style="margin-left: 8px" @click="isDeleteConfirmVisible = true">删除</Button>
              <Button type="success" style="margin-left: 30px" @click="addQuestionToPaper">加入试卷</Button>
          </Form-item>
        </Form>
      </Card>
    </Col>
    <Modal
        v-model="isDeleteConfirmVisible"
        title="确认框"
        @on-ok="remove"
        @on-cancel="cancel">
        <p>你确认要删除吗？</p>
    </Modal>
  </Row>

</template>

<script>
import Bus from '../bus'
import utils from '../../utils'
import JudgementIO from '../../io/JudgementIO'

export default {
  data () {
    return {
      isDeleteConfirmVisible: false
    }
  },

  computed: {

  },

  props: ['question'],

  methods: {
    addQuestionToPaper () {
      Bus.$emit('addQuestionToPaper', this.question)
    },

    alter () {
      Bus.$emit('alterJudgementQuestion', utils.clone(this.question))
    },

    remove () {
      const self = this
      const id = this.question._id
      new JudgementIO().delete({id}).then(res => {
        self.$Message.success('删除成功！');
        Bus.$emit('updateJudgementList')
      }).catch(err => {
        alert('err')
      })
    },

    cancel () {
      this.$Message.info('取消删除！');
    }
  }
}
</script>
