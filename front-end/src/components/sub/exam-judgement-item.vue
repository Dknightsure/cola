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
          <Form-item label="正确答案">
            <Radio-group v-model="question.answer" >
                <Radio :label="0">否</Radio>
                <Radio :label="1">是</Radio>
            </Radio-group>
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