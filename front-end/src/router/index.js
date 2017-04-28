import Vue from 'vue'
import Router from 'vue-router'
import SingleList from '@/components/page/single-list'
import MutipleList from '@/components/page/mutiple-list'
import BlankList from '@/components/page/blank-list'
import JudgementList from '@/components/page/judgement-list'
import AddSignle from '@/components/page/add-single'
import AddMutiple from '@/components/page/add-mutiple'
import AddBlank from '@/components/page/add-blank'
import AddJudgement from '@/components/page/add-judgement'
import PaperList from '@/components/page/paper-list'
import StudentExamList from '@/components/page/student-exam-list'
import StudentPracticeList from '@/components/page/student-practice-list'
import StudentExam from '@/components/page/student-exam'
import ExamRecord from '@/components/page/student-exam-record'
import PracticeRecord from '@/components/page/student-practice-record'
import StudentPractice from '@/components/page/student-practice'
import PracticePaperList from '@/components/page/practice-paper-list'

import NAME from './name'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: NAME.SINGLE_LIST,
    component: SingleList
  }, {
    path: '/mutiple',
    name: NAME.MUTIPLE_LIST,
    component: MutipleList
  }, {
    path: '/blank',
    name: NAME.BLANK_LIST,
    component: BlankList
  }, {
    path: '/judgement',
    name: NAME.JUDGEMENT_LIST,
    component: JudgementList
  }, {
    path: '/add/single',
    name: NAME.ADD_SINGLE,
    component: AddSignle
  }, {
    path: '/add/mutiple',
    name: NAME.ADD_MUTIPLE,
    component: AddMutiple
  }, {
    path: '/add/blank',
    name: NAME.ADD_BLANK,
    component: AddBlank
  }, {
    path: '/add/judgement',
    name: NAME.ADD_JUDGEMENT,
    component: AddJudgement
  }, {
    path: '/papers',
    name: NAME.PAPER_LIST,
    component: PaperList
  }, {
    path: '/student/examList',
    name: NAME.STUDENT_EXAM_LIST,
    component: StudentExamList
  }, {
    path: '/student/practiceList',
    name: NAME.STUDENT_PRACTICE_LIST,
    component: StudentPracticeList
  }, {
    path: '/exam/:paperId',
    name: NAME.STUDENT_EXAM,
    component: StudentExam
  }, {
    path: '/exam-record',
    name: NAME.EXAM_RECORD,
    component: ExamRecord
  }, {
    path: '/practice-record',
    name: NAME.PRACTICE_RECORD,
    component: PracticeRecord
  }, {
    path: '/practice/:paperId',
    name: NAME.STUDENT_PRACTICE,
    component: StudentPractice
  }, {
    path: '/practice-paper-list',
    name: NAME.PRACTICE_PAPER_LIST,
    component: PracticePaperList
  }]
})