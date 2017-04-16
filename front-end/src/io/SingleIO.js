import BaseIO from './BaseIO'

function SingleIO() {
  BaseIO.call(this);
}

SingleIO.prototype.addSignle = function (data) {
  let obj = this.api.addSignle;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

SingleIO.prototype.getList = function (params) {
  let obj = this.api.getSingleList;

  return this.axios({
    method: obj.method,
    url: obj.url,
    params: params
  })
}

SingleIO.prototype.alter = function (data) {
  let obj = this.api.alterSingle;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

SingleIO.prototype.delete = function (data) {
  let obj = this.api.deleteSingle;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

export default SingleIO