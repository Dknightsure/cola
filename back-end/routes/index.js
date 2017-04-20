var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
//创建数据库连接
var db = mongoose.connect('mongodb://localhost:27017/cola');

//检查是否连接成功
db.connection.on("error", function (error) {
  console.log("数据库连接失败：" + error);
});

db.connection.on("open", function (error) {
  console.log("++++++数据库连成功++++++");
});

var USER = 'hushuo'

var SelectionSchema = new mongoose.Schema({
  title: { type: String }
});

var SingleQuestionSchema = new mongoose.Schema({
  title: { type: String },
  selections: [SelectionSchema],
  answer: { type: Number },
  difficulty: { type: Number },
  type: { type: String }
});

var MutipleQuestionSchema = new mongoose.Schema({
  title: { type: String },
  selections: [SelectionSchema],
  answer: { type: Array },
  difficulty: { type: Number },
  type: { type: String }
});

var BlankQuestionSchema = new mongoose.Schema({
  title: { type: String },
  selections: [SelectionSchema],
  difficulty: { type: Number },
  type: { type: String }
});

var PaperSchema = new mongoose.Schema({
  name: { type: String },
  date: { type: Number },
  type: {
    type: String,
    default: 'exam'
  },
  time: {
    type: Number,
    default: 30
  },
  makeup: {
    type: Number,
    default: 1
  },
  singleQuestions: [SingleQuestionSchema],
  mutipleQuestions: [MutipleQuestionSchema],
  blankQuestions: [BlankQuestionSchema]
});

var ExamSingleAnswer = new mongoose.Schema({
  questionId: { type: String },
  answer: { type: Number }
})

var ExamMutipleAnswer = new mongoose.Schema({
  questionId: { type: String },
  answer: { type: Array }
})

var ExamBlankAnswer = new mongoose.Schema({
  questionId: { type: String },
  selections: [SelectionSchema]
})

var ExamSchema = new mongoose.Schema({
  paperId: { type: String },
  user: { type: String },
  makeup: { type: Number, default: 0 },
  date: { type: Number },
  singleQuestions: [ExamSingleAnswer],
  mutipleQuestions: [ExamMutipleAnswer],
  blankQuestions: [ExamBlankAnswer]
})

var PracticeSchema = new mongoose.Schema({
  paperId: { type: String },
  user: { type: String },
  date: { type: Number },
  singleQuestions: [ExamSingleAnswer],
  mutipleQuestions: [ExamMutipleAnswer],
  blankQuestions: [ExamBlankAnswer]
})

var SingleQuestionModel = db.model('SingleQuestions', SingleQuestionSchema);
var MutipleQuestionModel = db.model('MutipleQuestions', MutipleQuestionSchema);
var BlankQuestionModel = db.model('BlankQuestions', BlankQuestionSchema);
var PaperModel = db.model('Papers', PaperSchema);
var ExamModel = db.model('Exams', ExamSchema);
var PracticeModel = db.model('Practices', PracticeSchema);

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.send('respond with a index');
  res.render('index');
});

router.get('/api/query-single-question', function (req, res, next) {
  SingleQuestionModel.find({}, function (err, data) {
    res.json(data);
  });
})

router.get('/api/query-mutiple-question', function (req, res, next) {
  MutipleQuestionModel.find({}, function (err, data) {
    res.json(data);
  });
})

router.get('/api/query-blank-question', function (req, res, next) {
  BlankQuestionModel.find({}, function (err, data) {
    res.json(data);
  });
})

router.post('/api/alter-single-question', function (req, res, next) {
  SingleQuestionModel.findById(req.body._id, function (err, question) {
    if (err) {
      return console.log(err);
    } else {
      question.title = req.body.title;
      question.selections = req.body.selections;
      question.answer = req.body.answer;
      question.difficulty = req.body.difficulty;

      question.save(function (err) {
        if (err) {
          console.log(err);
          res.json('fail');
        }
        res.json('success');
      })
    }
  })
})

router.post('/api/alter-mutiple-question', function (req, res, next) {
  MutipleQuestionModel.findById(req.body._id, function (err, question) {
    if (err) {
      return console.log(err);
    } else {
      question.title = req.body.title;
      question.selections = req.body.selections;
      question.answer = req.body.answer;
      question.difficulty = req.body.difficulty;

      question.save(function (err) {
        if (err) {
          console.log(err);
          res.json('fail');
        }
        res.json('success');
      })
    }
  })
})

router.post('/api/alter-blank-question', function (req, res, next) {
  BlankQuestionModel.findById(req.body._id, function (err, question) {
    if (err) {
      return console.log(err);
    } else {
      question.title = req.body.title;
      question.selections = req.body.selections;
      question.difficulty = req.body.difficulty;

      question.save(function (err) {
        if (err) {
          console.log(err);
          res.json('fail');
        }
        res.json('success');
      })
    }
  })
})

router.post('/api/add-single-question', function (req, res, next) {
  var question = new SingleQuestionModel({
    title: req.body.title,
    selections: req.body.selections,
    answer: req.body.answer,
    difficulty: req.body.difficulty,
    type: 'single'
  });

  question.save(function (err, ques) {
    if (err) {
      console.log(err);
      res.json('fail');
    } else {
      res.json('success');
    }
  })
});

router.post('/api/add-mutiple-question', function (req, res, next) {
  var question = new MutipleQuestionModel({
    title: req.body.title,
    selections: req.body.selections,
    answer: req.body.answer,
    difficulty: req.body.difficulty,
    type: 'mutiple'
  });

  question.save(function (err, ques) {
    if (err) {
      console.log(err);
      res.json('fail');
    } else {
      res.json('success');
    }
  });
});

router.post('/api/add-blank-question', function (req, res, next) {
  var question = new BlankQuestionModel({
    title: req.body.title,
    selections: req.body.selections,
    difficulty: req.body.difficulty,
    type: 'blank'
  });

  question.save(function (err, ques) {
    if (err) {
      console.log(err);
      res.json('fail');
    } else {
      res.json('success');
    }
  });
});

router.post('/api/remove-single-question', function (req, res, next) {
  var id = ObjectId(req.body.id);
  SingleQuestionModel.remove({ _id: id }, function (err) {
    if (err) {
      console.log(err);
      res.json('fail');
    } else {
      res.json('success');
    }
  })
});

router.post('/api/remove-mutiple-question', function (req, res, next) {
  var id = ObjectId(req.body.id);
  MutipleQuestionModel.remove({ _id: id }, function (err) {
    if (err) {
      console.log(err);
      res.json('fail');
    } else {
      res.json('success');
    }
  })
});

router.post('/api/remove-blank-question', function (req, res, next) {
  var id = ObjectId(req.body.id);
  BlankQuestionModel.remove({ _id: id }, function (err) {
    if (err) {
      console.log(err);
      res.json('fail');
    } else {
      res.json('success');
    }
  })
});

router.post('/api/remove-paper', function (req, res, next) {
  var id = ObjectId(req.body.id);
  PaperModel.remove({ _id: id }, function (err) {
    if (err) {
      console.log(err);
      res.json('fail');
    } else {
      res.json('success');
    }
  })
})

router.post('/api/add-paper', function (req, res, next) {
  var paper = new PaperModel({
    name: req.body.name,
    date: +new Date
  });

  //添加单选
  for (var i = 0; i < req.body.singleQuestions.length; i++) {
    var q = req.body.singleQuestions[i];
    var question = {
      title: q.title,
      selections: q.selections,
      answer: q.answer,
      difficulty: q.difficulty
    }
    paper.singleQuestions.push(question);
  }

  //添加多选
  for (var j = 0; j < req.body.mutipleQuestions.length; j++) {
    var q = req.body.mutipleQuestions[j];
    var question = {
      title: q.title,
      selections: q.selections,
      answer: q.answer,
      difficulty: q.difficulty
    }
    paper.mutipleQuestions.push(question);
  }

  //添加填空
  for (var k = 0; k < req.body.blankQuestions.length; k++) {
    var q = req.body.blankQuestions[k];
    var question = {
      title: q.title,
      selections: q.selections,
      difficulty: q.difficulty
    }
    paper.blankQuestions.push(question);
  }

  paper.save(function (err, ques) {
    if (err) {
      console.log(err);
      res.json('fail');
    } else {
      res.json('success');
    }
  });
})

router.get('/api/get-papers', function (req, res, next) {
  PaperModel.find({}, function (err, data) {
    res.json(data);
  })
});

router.post('/api/get-paper-detail/', function (req, res, next) {
  PaperModel.findById(req.body.id, function (err, paper) {
    if (err) {
      console.log(err);
    } else {
      res.json(paper);
    }
  })
})

router.post('/api/add-exam-answer', function (req, res, next) {
  var queryPastExam = new Promise((resolve, reject) => {
    ExamModel.find({ "paperId": req.body._id, "user": USER }, function (err, data) {
      if (!err) {
        resolve(data)
      } else {
        reject(data)
      }
    })
  })

  var makeup;

  queryPastExam.then(function (data) {
    if (data.length == 0) {
      makeup = 0;
    } else {
      data.sort(function (exam1, exam2) {
        return exam2.makeup - exam1.makeup
      })

      makeup = data[0].makeup + 1
    }

    var exam = new ExamModel({
      paperId: req.body._id,
      user: USER,
      makeup: makeup,
      date: +new Date()
    })

    exam.singleQuestions = req.body.singleQuestions;
    exam.mutipleQuestions = req.body.mutipleQuestions;
    exam.blankQuestions = req.body.blankQuestions;

    exam.save(function (err) {
      if (err) {
        console.log(err);
        res.json('fail');
      } else {
        res.json('success');
      }
    });
  })
})

router.post('/api/add-practice-answer', function (req, res, next) {
  var practice = new PracticeModel({
    paperId: req.body._id,
    user: USER,
    date: +new Date()
  })

  practice.singleQuestions = req.body.singleQuestions;
  practice.mutipleQuestions = req.body.mutipleQuestions;
  practice.blankQuestions = req.body.blankQuestions;

  practice.save(function (err) {
    if (err) {
      console.log(err)
      res.json('fail')
    } else {
      res.json('success')
    }
  })
})

router.post('/api/get-exams', function (req, res, next) {
  PaperModel.find({ "type": "exam" }, function (err, data) {
    if (!err) {
      res.json(data)
    } else {
      res.json('fail')
    }
  })
})

router.post('/api/get-exam-list', function (req, res, next) {
  var user = req.body.user
  ExamModel.find({ "user": user }).lean().exec(function (err, exams) {
    if (!err) {
      var allQuery = []
      exams.forEach(function (exam) {
        allQuery.push(new Promise((resolve, reject) => {
          PaperModel.findById(exam.paperId, function (err, paper) {
            exam.name = paper.name
            resolve(exam)
          })
        }))
      });

      Promise.all(allQuery).then(data => {
        res.json(data)
      }).catch(err => {
        console.log(err)
        res.json('fail')
      })
    } else {
      res.json('fail')
    }
  })
})

router.post('/api/get-exam-result', function (req, res, next) {
  var paperId = req.body.paperId;
  var examId = req.body.examId;

  var queryPaper = new Promise((resolve, reject) => {
    PaperModel.findById(paperId).lean().exec(function (err, paper) {
      if (!err) {
        resolve(paper)
      } else {
        reject(err)
      }
    })
  })

  var queryExam = new Promise((resolve, reject) => {
    ExamModel.findById(examId).lean().exec(function (err, exam) {
      if (!err) {
        resolve(exam)
      } else {
        reject(err)
      }
    })
  })

  Promise.all([queryPaper, queryExam]).then(data => {
    res.json({
      paper: data[0],
      exam: data[1]
    })
  }).catch(err => {
    res.json('fail')
  })
})

router.post('/api/get-practice-result', function (req, res, next) {
  var paperId = req.body.paperId;
  var practiceId = req.body.practiceId;

  var queryPaper = new Promise((resolve, reject) => {
    PaperModel.findById(paperId).lean().exec(function (err, paper) {
      if (!err) {
        resolve(paper)
      } else {
        reject(err)
      }
    })
  })

  var queryPractice = new Promise((resolve, reject) => {
    PracticeModel.findById(practiceId).lean().exec(function (err, practice) {
      if (!err) {
        resolve(practice)
      } else {
        reject(err)
      }
    })
  })

  Promise.all([queryPaper, queryPractice]).then(data => {
    res.json({
      paper: data[0],
      practice: data[1]
    })
  }).catch(err => {
    res.json('fail')
  })
})

router.post('/api/changeToPractice', function (req, res, next) {
  var id = req.body.id;
  PaperModel.findById(id, function (err, paper) {
    if (!err) {
      if (paper.type === 'practice') {
        res.json('changed')
        return;
      }
      paper.type = 'practice';
      paper.save(function (err) {
        if (!err) {
          res.json('sucess')
        } else {
          res.json('fail')
        }
      })
    }
  })
})

router.post('/api/get-practice-list', function (req, res, next) {
  PaperModel.find({ "type": "practice" }, function (err, data) {
    if (!err) {
      res.json(data)
    } else {
      res.json('fail')
    }
  })
})

router.post('/api/get-practice-record', function (req, res, next) {
  var user = req.body.user
  PracticeModel.find({ "user": user }).lean().exec(function (err, practices) {
    if (!err) {
      var allQuery = []
      practices.forEach(function (practice) {
        allQuery.push(new Promise((resolve, reject) => {
          PaperModel.findById(practice.paperId, function (err, paper) {
            practice.name = paper.name
            resolve(practice)
          })
        }))
      });

      Promise.all(allQuery).then(data => {
        res.json(data)
      }).catch(err => {
        console.log(err)
        res.json('fail')
      })
    } else {
      res.json('fail')
    }
  })
})



module.exports = router;