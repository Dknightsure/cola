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
              <left-nav activeName="practice-paper-list" :openName="['paper']"></left-nav>
            </i-col>
            <i-col span="19">
                <div class="layout-header">
                  <h1>试题管理&组卷</h1>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">首页</Breadcrumb-item>
                        <Breadcrumb-item>练习卷</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <Table border :context="self" :columns="head" :data="data"></Table>
                    </div>
                </div>
                <div class="layout-copy">
                    HQU
                </div>
            </i-col>
        </Row>
        <paper-detail></paper-detail>
        <Modal
            v-model="isDeleteConfirmVisible"
            title="确认框"
            @on-ok="remove"
            @on-cancel="cancel">
            <p>你确认要删除吗？</p>
        </Modal>
    </div>
</template>
<script>
import LeftNav from '../sub/left-nav'
import PaperIO from '../../io/PaperIO'
import PaperDetail from '../sub/paper-detail'
import Bus from '../bus'

export default {
  data () {
    return {
      self: this,
      isDeleteConfirmVisible: false,
      removeIndex: 0,
      head: [
        {
            title: '试卷名称',
            key: 'name',
            render (row, column, index) {
                return `<Icon type="document-text"></Icon> <strong>${row.name}</strong>`;
            }
        },
        {
            title: '创建时间',
            key: 'date'
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render (row, column, index) {
                return `<i-button type="primary" size="small" @click="showDetail(${index})">查看</i-button> <i-button type="error" size="small" @click="deleteConfirm(${index})">删除</i-button>`;
            }
        }
      ],
      data: []
    }
  },

  mounted () {
    const self = this
    this.fetchData();
    Bus.$on('reload-paper-list', () => {
      self.fetchData();
    })
  },

  methods: {
    fetchData () {
      const self = this;
      self.data = []
      new PaperIO().getPracticePaperList().then(res => {
        let paperList = res.data;
        for(let i = 0; i < paperList.length; i++){
          let paper = {};
          paper.name = paperList[i].name;
          paper.date = new Date(paperList[i].date);
          paper._id = paperList[i]._id;
          self.data.push(paper);
        }
      }).catch(err => {
        self.$Message.error('获取试卷列表失败！')
      })
    },

    showDetail (index) {
      const id = this.data[index]._id;
      new PaperIO().getPracticePaperDetail({id}).then(res => {
        console.log(res.data)
        Bus.$emit('showPaperDetail', res.data);
      }).catch(err => {
        self.$Message.error('获取试卷详情失败！')
      })
    },

    deleteConfirm (index) {
      this.isDeleteConfirmVisible = true
      this.removeIndex = index
    },

    close () {
      this.isDeleteConfirmVisible = false
    },

    remove () {
      const self = this;
      const index = this.removeIndex;
      const id = this.data[index]._id;
      new PaperIO().deletePracticePaper({id}).then(res => {
        self.$Message.success('删除成功！');
        self.close();
        self.fetchData();
      }).catch(err => {
        self.$Message.error('删除失败！');
      })
    },

    cancel () {
      this.$Message.info('取消删除！');
    }
  },
  
  components: {
    LeftNav,
    PaperDetail
  }
}
</script>
