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
              <left-nav activeName="q-mutiple-list" :openName="['question']"></left-nav>
            </i-col>
            <i-col span="19">
                <div class="layout-header">
                  <h1>试题管理&组卷</h1>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">首页</Breadcrumb-item>
                        <Breadcrumb-item href="#">试题库</Breadcrumb-item>
                        <Breadcrumb-item>多选题</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                      <mutiple-query v-for="(question, index) in questions" :question="question" :key="index"></mutiple-query>
                    </div>
                </div>
                <div class="layout-copy">
                    HQU
                </div>
            </i-col>
        </Row>
        <mutiple-modal></mutiple-modal>
    </div>
</template>
<script>
import LeftNav from '../sub/left-nav'
import MutipleQuery from '../sub/mutiple-query'
import MutipleIO from '../../io/MutipleIO'
import MutipleModal from '../sub/modal-mutiple-alter'
import Bus from '../bus'

export default {
  data () {
    return {
      questions: []
    }
  },

  mounted () {
    this.fetchData()
    this.listenUpdate()
  },

  methods: {
    fetchData () {
      var self = this;
      new MutipleIO().getList().then(res => {
        self.questions = res.data;
      }).catch(err => {
        console.log(err);
      })
    },

    listenUpdate () {
      const self = this
      Bus.$on('updateMutipleList', () => {
        self.fetchData()
      })
    }
  },

  components: {
    LeftNav,
    MutipleQuery,
    MutipleModal
  }
}
</script>
