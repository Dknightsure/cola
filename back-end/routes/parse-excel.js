var XLSX = require('xlsx');

module.exports = function (filePath, cb) {
  const workbook = XLSX.readFile(filePath);
  const paperName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[paperName]


  const timeCeil = 'B1';
  const makeupCeil = 'B2';

  const paper = {
    name: paperName,
    time: worksheet[timeCeil].v,
    makeup: worksheet[makeupCeil].v,
    singleQuestions: [],
    mutipleQuestions: [],
    blankQuestions: [],
    judgementQuestions: []
  }

  const maxStr = worksheet['!ref'].split(':')[1];
  const table = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var maxNumber = '';

  for (let i = 0; i < maxStr.length; i++) {
    if (maxStr[i] in table) {
      maxNumber += maxStr[i];
    }
  }
  maxNumber = parseInt(maxNumber, 10);

  for (let i = 3; i <= maxNumber; i++) {
    let firstColumn = 'A' + i;
    if (worksheet[firstColumn]) {
      let question = {};
      question.title = worksheet['C' + i].v;
      switch (worksheet[firstColumn].v) {
        case '单选':
          question.selections = [];
          let j = 'C';
          while (worksheet[j + (i + 1)]) {
            question.selections.push({ title: worksheet[j + (i + 1)].v });
            j = String.fromCharCode(j.charCodeAt() + 1)
          }
          question.difficulty = worksheet['C' + (i + 2)].v;
          question.answer = worksheet['C' + (i + 3)].v;
          question.score = worksheet['C' + (i + 4)].v;
          paper.singleQuestions.push(question)
          break;
        case '多选':
          question.selections = [];
          let k = 'C';
          question.answer = []
          while (worksheet[k + (i + 1)]) {
            question.selections.push({ title: worksheet[k + (i + 1)].v });
            if (worksheet[k + (i + 3)]) {
              question.answer.push(worksheet[k + (i + 3)].v)
            }
            k = String.fromCharCode(k.charCodeAt() + 1)
          }
          question.difficulty = worksheet['C' + (i + 2)].v;
          question.score = worksheet['C' + (i + 4)].v;
          paper.mutipleQuestions.push(question)
          break;
        case '填空':
          let x = 'C';
          question.selections = [];
          question.score = [];
          while (worksheet[x + (i + 2)]) {
            question.selections.push({ title: worksheet[x + (i + 2)].v });
            x = String.fromCharCode(x.charCodeAt() + 1)
          }
          question.difficulty = worksheet['C' + (i + 1)].v;
          let m = 'C';
          while (worksheet[m + (i + 3)]) {
            question.score.push(worksheet[m + (i + 3)].v);
            m = String.fromCharCode(m.charCodeAt() + 1)
          }
          paper.blankQuestions.push(question)
          break;
        case '判断':
          question.difficulty = worksheet['C' + (i + 1)].v;
          question.answer = worksheet['C' + (i + 2)].v;
          question.score = worksheet['C' + (i + 3)].v;
          paper.judgementQuestions.push(question)
          break;
        default:
          console.log('not read')
      }
    }
  }

  cb && cb(paper);
}