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
            <Button type="primary">提交</Button>
            <Button type="ghost" style="margin-left: 8px" @click="addOption">添加选项</Button>
        </Form-item>
    </Form>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import Bus from '../bus'

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
      Bus.$on('alterSingleQuestion', (question) => {
        self.isVisible = true
        self.question = question
      })
    },

    addOption () {
      this.question.selections.push({
        title: ''
      })
    },

    deleteOption (index) {
      this.question.selections.splice(index, 1)
    },
  }
}
</script>