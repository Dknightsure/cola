import BaseIO from './BaseIO'

function PaperIO() {
  BaseIO.call(this);
}

PaperIO.prototype.addPaper = function (data) {
  let obj = this.api.addPaper;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.addPracticePaper = function (data) {
  let obj = this.api.addPracticePaper;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.getList = function (params) {
  let obj = this.api.getPaperList;

  return this.axios({
    method: obj.method,
    url: obj.url,
    params: params
  })
}

PaperIO.prototype.getPracticePaperList = function (params) {
  let obj = this.api.getPracticePaperList;

  return this.axios({
    method: obj.method,
    url: obj.url,
    params: params
  })
}

PaperIO.prototype.getDetail = function (data) {
  let obj = this.api.getPaperDetail;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.getPracticePaperDetail = function (data) {
  let obj = this.api.getPracticePaperDetail;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.delete = function (data) {
  let obj = this.api.deletePaper;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.deletePracticePaper = function (data) {
  let obj = this.api.deletePracticePaper;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.addExam = function (data) {
  let obj = this.api.addExam;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.getExam = function (data) {
  let obj = this.api.getExamRecord;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.getExamResult = function (data) {
  let obj = this.api.getExamResult;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.changeToPractice = function (data) {
  let obj = this.api.changeToPractice;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.getPracticeList = function (data) {
  let obj = this.api.getPracticeList;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.getExamList = function (data) {
  let obj = this.api.getExamList;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.addPractice = function (data) {
  let obj = this.api.addPractice;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.getPracticeRecord = function (data) {
  let obj = this.api.getPracticeRecord;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.getPracticeResult = function (data) {
  let obj = this.api.getPracticeResult;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

PaperIO.prototype.autoPaper = function (data) {
  let obj = this.api.autoPaper;

  return this.axios({
    method: obj.method,
    url: obj.url,
    data: data
  })
}

export default PaperIO