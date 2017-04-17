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
          <Form-item label="题目难度">
              <Rate allow-half disabled v-model="question.difficulty"></Rate>
          </Form-item>
          <Form-item
            :label="index | indexToSelection('填空')"
            v-for="(item, index) in question.selections"
            :key="index">
              <Input v-model="item.title" placeholder="请输入"></Input>
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