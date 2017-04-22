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
</template>

<script>
import JudgementIO from '../../io/JudgementIO'

export default {
  data () {
    return {
      question: {
        title: '人只有一个性别吗？',
        difficulty: 2.5,
        answer: 0,
      }
    }
  },
  methods: {
    submit () {
      const self = this
      new JudgementIO().add(this.question).then(res => {
        self.$Message.success('添加成功！')
      }).catch(err => {
        self.$Message.error('添加失败！')
      })
    }
  }
}
</script>
