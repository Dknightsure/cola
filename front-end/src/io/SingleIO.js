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

export default SingleIO
