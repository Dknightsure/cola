<style lang="scss" scoped>
.container-paper-car {
  position: fixed;
  width: 300px;
  left: 25%;
  bottom: 20px;
  z-index: 100;

  &:hover {
    ul {
      display: block;
    }
  }

  h1 {
    padding: 0 10px;
    background-color: #5cadff;
    color: #fff;
    text-align: center;
    position: relative;

    .submit-paper {
      position: absolute;
      right: -80px;
      top: 0px;
      display: none;
    }

    &:hover {
      .submit-paper {
        display: block;
      }
    }
  }

  ul {
    width: 100%;
    overflow: hidden;
    border: 1px solid #5cadff;
    display: none;

    li {
      font-size: 18px;
      padding: 0 20px;
      border-bottom: 1px dotted #657180;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .icon-delete {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      display: none;
      cursor: pointer;
    }

    li:hover {
      .icon-delete {
        display: inline-block;
      }
    }
  }
}
</style>
<template>
  <div class="container-paper-car">
    <Input v-model="name" placeholder="试卷标题..." style="width: 300px"></Input>
    <ul>
      <li v-for="(question, index) in questions">
        {{ question.title }}
        <div @click="deleteQuestion(index)">
          <Icon type="trash-a" color="#ff0000" size="20" class="icon-delete"></Icon>
        </div>
      </li>
    </ul>
    <h1>试卷试题数：{{ questions.length }}<Button type="primary" class="submit-paper" @click="submitPaper">发布试卷</Button></h1>
  </div>
</template>

<script>
import Bus from '../bus'
import PaperIO from '../../io/PaperIO'

export default {
  data () {
    return {
      name: '',
      questions: []
    }
  },

  mounted () {
    this.listenAddQuestion();
  },

  methods: {
    listenAddQuestion () {
      const self = this;
      Bus.$on('addQuestionToPaper', (question) => {
        self.questions.push(question);
        self.$Message.success('添加到试卷成功！')
      })
    },

    deleteQuestion (index) {
      this.questions.splice(index, 1);
      this.$Message.success('试题移出试卷成功！')
    },

    submitPaper () {
      const self = this;
      const paper = {
        name: self.name,
        singleQuestions: [],
        mutipleQuestions: [],
        blankQuestions: []
      };

      for(var i = 0; i < self.questions.length; i++) {
        let question = self.questions[i];
        switch (question.type){
          case 'single':
            paper.singleQuestions.push(question);
            break;
          case 'mutiple':
            paper.mutipleQuestions.push(question);
            break;
          case 'blank':
            paper.blankQuestions.push(question);
            break;
          default:
            break;
        }
      }

      new PaperIO().addPaper(paper).then(res => {
        alert('success')
      }).catch(err => {
        alert('error')
      })
    }
  }
}
</script>
