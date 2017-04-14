import BaseIO from './BaseIO'

function BlankIO() {
  BaseIO.call(this);
}

BlankIO.prototype.addBlank = function (data) {
  let obj = this.api.addBlank;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

BlankIO.prototype.getList = function (params) {
  let obj = this.api.getBlankList;

  return this.axios({
    method: obj.method,
    url: obj.url,
    params: params
  })
}

export default BlankIO