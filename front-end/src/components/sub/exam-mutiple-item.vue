<style lang="scss" scoped>
  
</style>

<template>
  <Row>
    <Col span="24">
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
          <Form-item label="题目分数" v-if="question.score">
              {{ question.score }}
          </Form-item>
          <Form-item label="请选择">
              <Checkbox-group v-model="question.answer">
                <Checkbox v-for="(item, index) in question.selections" :label="index" :key="index">{{ item.title }}</Checkbox>
              </Checkbox-group>
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