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

export default BlankIO
