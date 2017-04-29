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
              <left-nav activeName="search-question" :openName="['question']"></left-nav>
            </i-col>
            <i-col span="19">
                <div class="layout-header">
                  <h1>试题管理&组卷</h1>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">首页</Breadcrumb-item>
                        <Breadcrumb-item href="#">试题库</Breadcrumb-item>
                        <Breadcrumb-item>搜索试题</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <Row>
                            <Col span="8" offset="8">
                                <Input v-model="searchValue" placeholder="请输入搜索内容..." style="width: 300px"></Input>
                                <Button type="primary" @click="search" icon="ios-search">搜索</Button>
                            </Col>
                        </Row>
                        <single-query v-for="(question, index) in result.singleQuestions" :question="question" :key="index"></single-query>
                        <mutiple-query v-for="(question, index) in result.mutipleQuestions" :question="question" :key="index"></mutiple-query>
                        <blank-query v-for="(question, index) in result.blankQuestions" :question="question" :key="index"></blank-query>
                        <judgement-query v-for="(question, index) in result.judgementQuestions" :question="question" :key="index"></judgement-query>
                    </div>
                </div>
                <div class="layout-copy">
                    HQU
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
import LeftNav from '../sub/left-nav'
import Bus from '../bus'
import SingleQuery from '../sub/single-query'
import MutipleQuery from '../sub/mutiple-query'
import BlankQuery from '../sub/blank-query'
import JudgementQuery from '../sub/judgement-query'
import SearchIO from '../../io/SearchIO'

export default {
  data () {
    return {
      searchValue: null,
      result: {}
    }
  },

  methods: {
    search () {
      const self = this;
      new SearchIO().search({searchValue: self.searchValue}).then(res => {
        self.result = res.data;
        var num = self.result.singleQuestions.length + self.result.mutipleQuestions.length + self.result.blankQuestions.length + self.result.judgementQuestions.length
        self.$Message.success('搜索到 ' + num + ' 条结果！');
      }).catch(err => {
        self.$Message.error('搜索失败！')
      })
    }
  },

  components: {
    LeftNav,
    SingleQuery,
    MutipleQuery,
    BlankQuery,
    JudgementQuery
  }
}
</script>
