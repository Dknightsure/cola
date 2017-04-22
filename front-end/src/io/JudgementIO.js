import BaseIO from './BaseIO'

function JudgementIO() {
  BaseIO.call(this);
}

JudgementIO.prototype.add = function (data) {
  let obj = this.api.addJudgement;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

JudgementIO.prototype.getList = function (params) {
  let obj = this.api.getJudgementList;

  return this.axios({
    method: obj.method,
    url: obj.url,
    params: params
  })
}

JudgementIO.prototype.alter = function (data) {
  let obj = this.api.alterJudgement;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

JudgementIO.prototype.delete = function (data) {
  let obj = this.api.deleteJudgement;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

export default JudgementIO