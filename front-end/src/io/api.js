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

  addPaper: {
    url: '/api/add-paper',
    method: 'POST'
  },

  getPaperList: {
    url: '/api/get-papers',
    method: 'GET'
  },

  getPaperDetail: {
    url: '/api/get-paper-detail',
    method: 'POST'
  }
}