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
        <Form-item
          class="option-item"
          :label="index | indexToSelection('选项')"
          v-for="(item, index) in question.selections"
          :key="index">
            <div @click="deleteOption(index)">
              <Icon type="trash-a" color="#ff0000" size="20" class="icon-delete"></Icon>
            </div>
            <Input v-model="item.title" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="难度选择">
            <Rate allow-half v-model="question.difficulty"></Rate>
        </Form-item>
        <Form-item label="正确答案">
            <Radio-group v-model="question.answer" >
                <Radio :label="index" v-for="(item, index) in question.selections" :key="index">{{ index | indexToSelection('选项') }}</Radio>
            </Radio-group>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="submit">提交</Button>
            <Button type="ghost" style="margin-left: 8px" @click="addOption">添加选项</Button>
        </Form-item>
    </Form>
</template>

<script>
import SingleIO from '../../io/SingleIO'

export default {
  data () {
    return {
      question: {
        title: '',
        difficulty: 2.5,
        answer: 0,
        selections: [
          {
            title: ''
          },
          {
            title: ''
          },
          {
            title: ''
          },
          {
            title: ''
          }
        ],
      }
    }
  },
  methods: {
    addOption () {
      this.question.selections.push({
        title: ''
      })
    },

    deleteOption (index) {
      this.question.selections.splice(index, 1)
    },

    submit () {
      const self = this
      new SingleIO().addSignle(this.question).then(res => {
        self.$Message.success('添加成功！')
      }).catch(err => {
        self.$Message.error('添加失败！')
      })
    }
  }
}
</script>
