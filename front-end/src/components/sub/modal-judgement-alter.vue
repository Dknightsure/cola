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
</style>

<template>
  <Modal v-model="isVisible" width="600">
    <p slot="header" style="color:#3399ff;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>修改试题</span>
    </p>
    <Form :model="question" :label-width="80">
        <Form-item label="题目标题">
            <Input v-model="question.title" type="textarea" :autosize="{minRows: 5,maxRows: 8}" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item label="难度选择">
            <Rate allow-half v-model="question.difficulty"></Rate>
        </Form-item>
        <Form-item label="正确答案">
            <Radio-group v-model="question.answer" >
                <Radio :label="0">否</Radio>
                <Radio :label="1">是</Radio>
            </Radio-group>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="submit">提交</Button>
        </Form-item>
    </Form>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import Bus from '../bus'
import JudgementIO from '../../io/JudgementIO'

export default {
  data () {
    return {
      isVisible: false,
      question: {}
    }
  },

  mounted () {
    this.listenAlter()
  },

  methods: {
    listenAlter () {
      const self = this
      Bus.$on('alterJudgementQuestion', (question) => {
        self.isVisible = true
        self.question = question
      })
    },

    close () {
      this.isVisible = false
    },

    submit () {
      const self = this;
      new JudgementIO().alter(this.question).then(res => {
        self.close()
        self.$Message.success('修改成功！')
        Bus.$emit('updateJudgementList')
      }).catch(err => {
        self.$Message.error('修改失败！')
      })
    }
  }
}
</script>