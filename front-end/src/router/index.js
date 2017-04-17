import Vue from 'vue'
import Router from 'vue-router'
import SingleList from '@/components/page/single-list'
import MutipleList from '@/components/page/mutiple-list'
import BlankList from '@/components/page/blank-list'
import AddSignle from '@/components/page/add-single'
import AddMutiple from '@/components/page/add-mutiple'
import AddBlank from '@/components/page/add-blank'
import PaperList from '@/components/page/paper-list'
import StudentExamList from '@/components/page/student-exam-list'
import StudentPracticeList from '@/components/page/student-practice-list'
import StudentExam from '@/components/page/student-exam'

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
  }]
})