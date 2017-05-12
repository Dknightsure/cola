<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 1000px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 75px;
        border-radius: 3px;
        margin: 15px auto;

        img {
          width: 100%;
          height: 100%;
        }
    }

    h1 {
      text-align: center;
      padding: 10px 0 0 0;
    }
</style>
<template>
    <div class="layout">
        <Row type="flex">
            <i-col span="5" class="layout-menu-left">
              <left-nav activeName="auto-paper" :openName="['paper']"></left-nav>
            </i-col>
            <i-col span="19">
                <div class="layout-header">
                  <h1>试题管理&组卷</h1>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">首页</Breadcrumb-item>
                        <Breadcrumb-item href="#">试卷管理</Breadcrumb-item>
                        <Breadcrumb-item>自动组卷</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <Row>
                          <Col span="8" offset="8">
                              <Form :label-width="80" class="container">
                                  <Form-item label="试卷题目">
                                      <Input v-model="title" placeholder="请输入试卷题目..." style="width: 300px"></Input>
                                  </Form-item>
                                  <Form-item label="单选题目数">
                                      <Input-number v-model="singleNum"></Input-number> 每题分数：<Input-number v-model="singleScore"></Input-number>
                                  </Form-item>
                                  <Form-item label="多选题目数">
                                      <Input-number v-model="mutipleNum"></Input-number> 每题分数：<Input-number v-model="mutipleScore"></Input-number>
                                  </Form-item>
                                  <Form-item label="填空题目数">
                                      <Input-number v-model="blankNum"></Input-number> 每题分数：<Input-number v-model="blankScore"></Input-number>
                                  </Form-item>
                                  <Form-item label="判断题目数">
                                      <Input-number v-model="judgementNum"></Input-number> 每题分数：<Input-number v-model="judgementScore"></Input-number>
                                  </Form-item>
                                  <Form-item label="平均难度">
                                     <Input-number v-model="difficulty" :min="1" :max="5"></Input-number>
                                  </Form-item>
                                  <Form-item>
                                     <Button type="primary" @click="auto">自动组卷</Button>
                                     <Button type="primary" @click="isModalVisible = true">上传 Excel 组卷</Button>
                                  </Form-item>
                              </Form>
                          </Col>
                        </Row>
                    </div>
                </div>
                <div class="layout-copy">
                    HQU
                </div>
            </i-col>
        </Row>
        <Modal
          v-model="isModalVisible"
          title="上传组卷"
          @on-ok="ok">
          <Upload
              multiple
              type="drag"
              action="/excel-paper">
              <div style="padding: 20px 0">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>点击或将文件拖拽到这里上传</p>
              </div>
          </Upload>
      </Modal>
    </div>
</template>
<script>
import LeftNav from '../sub/left-nav'
import Bus from '../bus'
import PaperIO from '../../io/PaperIO'

export default {
  data () {
    return {
      title: '',
      singleNum: 0,
      singleScore: 10,
      mutipleNum: 0,
      mutipleScore: 10,
      blankNum: 0,
      blankScore: 10,
      judgementNum: 0,
      judgementScore: 10,
      difficulty: 1,
      isModalVisible: false
    }
  },

  mounted () {
  },

  methods: {
    auto () {
      const self = this
      const postData = {
        title: this.title,
        singleNum: this.singleNum,
        singleScore: this.singleScore,
        mutipleNum: this.mutipleNum,
        mutipleScore: this.mutipleScore,
        blankNum: this.blankNum,
        blankScore: this.blankScore,
        judgementNum: this.judgementNum,
        judgementScore: this.judgementScore,
        difficulty: this.difficulty
      }

      new PaperIO().autoPaper(postData).then( res => {
        self.$Message.success('自动组卷成功');
      }).catch( err => {
        self.$Message.error('自动组卷失败');
      })
    },

    ok () {
      console.log('ok')
    }
  },

  components: {
    LeftNav
  }
}
</script>
