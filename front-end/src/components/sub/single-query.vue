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
          <Form-item
            class="option-item"
            :label="index | indexToSelection('选项')"
            v-for="(item, index) in question.selections"
            :key="index">
              {{ item.title }}
          </Form-item>
          <Form-item label="题目难度">
              <Rate allow-half disabled v-model="question.difficulty"></Rate>
          </Form-item>
          <Form-item label="正确答案">
              {{ question.answer | indexToSelection('选项') }}
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
import SingleIO from '../../io/SingleIO'

export default {
  data () {
    return {
      isDeleteConfirmVisible: false
    }
  },

  props: ['question'],

  methods: {
    addQuestionToPaper () {
      Bus.$emit('addQuestionToPaper', utils.clone(this.question))
    },

    alter () {
      Bus.$emit('alterSingleQuestion', utils.clone(this.question))
    },

    remove () {
      const self = this
      const id = this.question._id
      new SingleIO().delete({id}).then(res => {
        self.$Message.success('删除成功！');
        Bus.$emit('updateSingleList')
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
