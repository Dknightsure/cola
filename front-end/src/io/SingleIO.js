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

export default SingleIO
