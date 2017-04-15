import BaseIO from './BaseIO'

function PaperIO() {
  BaseIO.call(this);
}

PaperIO.prototype.addPaper = function (data) {
  let obj = this.api.addPaper;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.getList = function (params) {
  let obj = this.api.getPaperList;

  return this.axios({
    method: obj.method,
    url: obj.url,
    params: params
  })
}

PaperIO.prototype.getDetail = function (data) {
  let obj = this.api.getPaperDetail;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

export default PaperIO