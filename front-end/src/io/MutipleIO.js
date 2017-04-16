import BaseIO from './BaseIO'

function MutipleIO() {
  BaseIO.call(this);
}

MutipleIO.prototype.addMutiple = function (data) {
  let obj = this.api.addMutiple;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

MutipleIO.prototype.getList = function (params) {
  let obj = this.api.getMutipleList;

  return this.axios({
    method: obj.method,
    url: obj.url,
    params: params
  })
}

MutipleIO.prototype.alter = function (data) {
  let obj = this.api.alterMutiple;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

MutipleIO.prototype.delete = function (data) {
  let obj = this.api.deleteMutiple;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

export default MutipleIO