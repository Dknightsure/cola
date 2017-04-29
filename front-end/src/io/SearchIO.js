import BaseIO from './BaseIO'

function SearchIO() {
  BaseIO.call(this);
}

SearchIO.prototype.search = function (data) {
  let obj = this.api.search;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

export default SearchIO