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
    <Col>
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
        </Form>
      </Card>
    </Col>
  </Row>

</template>

<script>
export default {
  data () {
    return {
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

  props: ['question']
}
</script>
