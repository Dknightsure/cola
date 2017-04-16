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
              {{ answer }}
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
import MutipleIO from '../../io/MutipleIO'

export default {
  data () {
    return {
      isDeleteConfirmVisible: false
    }
  },

  computed: {
    answer () {
      let res = [];
      let arr = this.question.answer;
      for (let i = 0; i < arr.length; i++) {
        res.push('选项 ' + String.fromCharCode(arr[i] + 65));
      }

      return res.join('，');
    }
  },

  props: ['question'],

  methods: {
    addQuestionToPaper () {
      Bus.$emit('addQuestionToPaper', this.question)
    },

    alter () {
      Bus.$emit('alterMutipleQuestion', utils.clone(this.question))
    },

    remove () {
      const self = this
      const id = this.question._id
      new MutipleIO().delete({id}).then(res => {
        self.$Message.success('删除成功！');
        Bus.$emit('updateMutipleList')
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
