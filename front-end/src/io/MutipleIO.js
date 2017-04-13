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

export default MutipleIO
