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

.container {
  margin: 20px 0 0 0;
}
</style>
<template>
  <Row class="container">
    <Col>
      <Card>
        <Form :model="question" :label-width="80">
          <Form-item label="题目标题">
            {{ question.title }}
          </Form-item>
          <Form-item label="题目难度">
              <Rate allow-half v-model="question.difficulty"></Rate>
          </Form-item>
          <Form-item label="正确答案">
              {{ question.answer == 0 ? '否' : '是' }}
          </Form-item>
          <Form-item label="题目分数" v-if="question.score">
              {{ question.score }}
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

  props: ['question']
}
</script>
