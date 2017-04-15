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
          <Form-item
            class="option-item"
            :label="index | indexToSelection('填空')"
            v-for="(item, index) in question.selections"
            :key="index">
              <div @click="deleteOption(index)">
                <Icon type="trash-a" color="#ff0000" size="20" class="icon-delete"></Icon>
              </div>
              {{ item.title }}
          </Form-item>
          <Form-item label="题目难度">
              <Rate allow-half v-model="question.difficulty"></Rate>
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
