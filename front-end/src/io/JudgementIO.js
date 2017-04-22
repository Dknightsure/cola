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

export default JudgementIO