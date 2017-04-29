/**
 * api 路径配置文件
 */

export default {
  addSignle: {
    url: '/api/add-single-question',
    method: 'POST'
  },

  addMutiple: {
    url: '/api/add-mutiple-question',
    method: 'POST'
  },

  addBlank: {
    url: '/api/add-blank-question',
    method: 'POST'
  },

  addJudgement: {
    url: '/api/add-judgement-question',
    method: 'POST'
  },

  getSingleList: {
    url: '/api/query-single-question',
    method: 'GET'
  },

  getMutipleList: {
    url: '/api/query-mutiple-question',
    method: 'GET'
  },

  getBlankList: {
    url: '/api/query-blank-question',
    method: 'GET'
  },

  getJudgementList: {
    url: '/api/query-judgement-question',
    method: 'GET'
  },

  addPaper: {
    url: '/api/add-paper',
    method: 'POST'
  },

  addPracticePaper: {
    url: '/api/add-practice-paper',
    method: 'POST'
  },

  getPaperList: {
    url: '/api/get-papers',
    method: 'GET'
  },

  getPracticePaperList: {
    url: '/api/get-practice-papers',
    method: 'GET'
  },

  getPaperDetail: {
    url: '/api/get-paper-detail',
    method: 'POST'
  },

  getPracticePaperDetail: {
    url: '/api/get-practice-paper-detail',
    method: 'POST'
  },

  alterSingle: {
    url: '/api/alter-single-question',
    method: 'POST'
  },

  alterMutiple: {
    url: '/api/alter-mutiple-question',
    method: 'POST'
  },

  alterBlank: {
    url: '/api/alter-blank-question',
    method: 'POST'
  },

  alterJudgement: {
    url: '/api/alter-judgement-question',
    method: 'POST'
  },

  deleteSingle: {
    url: '/api/remove-single-question',
    method: 'POST'
  },

  deleteMutiple: {
    url: '/api/remove-mutiple-question',
    method: 'POST'
  },

  deleteBlank: {
    url: '/api/remove-blank-question',
    method: 'POST'
  },

  deleteJudgement: {
    url: '/api/remove-judgement-question',
    method: 'POST'
  },

  deletePaper: {
    url: '/api/remove-paper',
    method: 'POST'
  },

  deletePracticePaper: {
    url: '/api/remove-practice-paper',
    method: 'POST'
  },

  addExam: {
    url: '/api/add-exam-answer',
    method: 'POST'
  },

  getExamRecord: {
    url: '/api/get-exam-list',
    method: 'POST'
  },

  getExamResult: {
    url: '/api/get-exam-result',
    method: 'POST'
  },

  getExamList: {
    url: '/api/get-exams',
    method: 'POST'
  },

  changeToPractice: {
    url: '/api/changeToPractice',
    method: 'POST'
  },

  getPracticeList: {
    url: '/api/get-practice-list',
    method: 'POST'
  },

  addPractice: {
    url: '/api/add-practice-answer',
    method: 'POST'
  },

  getPracticeRecord: {
    url: '/api/get-practice-record',
    method: 'POST'
  },

  getPracticeResult: {
    url: '/api/get-practice-result',
    method: 'POST'
  },

  search: {
    url: '/api/search',
    method: 'POST'
  }
}