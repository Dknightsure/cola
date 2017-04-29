<style lang="scss" scoped>
.container-paper-car {
  position: fixed;
  width: 300px;
  top: 10px;
  right: 10px;
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
}

ul {
  width: 100%;
  overflow: hidden;
  border: 1px solid #5cadff;

  li {
    font-size: 18px;
    padding: 0 20px;
    border-bottom: 1px dotted #657180;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  li:hover {
    .icon-delete {
      display: inline-block;
    }
  }
}

.icon-delete {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  cursor: pointer;
}

.score {
  width: 40px;
}

.paper-input {
  margin: 10px 0 0 0;
}

</style>
<template>
  <div class="container-paper-car">
    <h1 @click="isPaperVisible = true">试卷试题数：{{ questions.length }}</h1>
    <Modal
        v-model="isPaperVisible"
        title="试卷详情"
        @on-ok="submitPaper">
        请选择试卷类型：
        <Select v-model="type" style="width:200px">
          <Option value="exam">考试卷</Option>
          <Option value="practice">练习卷</Option>
        </Select>
        <Input v-model="name" placeholder="试卷标题..." class="paper-input"></Input>
        <Input v-model.number="time" placeholder="考试时间" :disabled="type == 'practice'" class="paper-input"></Input>
        <Input v-model.number="makeup" placeholder="补考次数" :disabled="type == 'practice'" class="paper-input"></Input>
        <ul>
          <li v-for="(question, index) in questions" :key="index">
            分数：<Input class="score" v-model.number="question.score" :disabled="type == 'practice'"></Input>
            题目：{{ question.title }}
            <div @click="deleteQuestion(index)">
              <Icon type="trash-a" color="#ff0000" size="20" class="icon-delete"></Icon>
            </div>
          </li>
        </ul>
    </Modal>
  </div>
</template>

<script>
import Bus from '../bus'
import PaperIO from '../../io/PaperIO'

export default {
  data () {
    return {
      isPaperVisible: false,
      name: '',
      type: 'exam',
      time: null,
      makeup: null,
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
        question.score = 10;
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
        time: self.time,
        makeup: self.makeup,
        singleQuestions: [],
        mutipleQuestions: [],
        blankQuestions: [],
        judgementQuestions: []
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
          case 'judgement':
            paper.judgementQuestions.push(question);
            break;
          default:
            break;
        }
      }

      if(self.type == 'exam'){
        console.log('exam')
        console.log(paper)
        new PaperIO().addPaper(paper).then(res => {
          Bus.$emit('reload-paper-list');
          self.$Message.success('发布考试卷成功！')
        }, err => {
          self.$Message.error('发布考试卷失败！')
        })
      }else if(self.type == 'practice'){
        console.log('practice')
        console.log(paper)
        new PaperIO().addPracticePaper(paper).then(res => {
          Bus.$emit('reload-paper-list');
          self.$Message.success('发布练习卷成功！')
        }, err => {
          self.$Message.error('发布练习卷失败！')
        })
      }

      
    }
  }
}
</script>
