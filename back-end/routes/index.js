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
  answer: [SelectionSchema]
})

var ExamSchema = new mongoose.Schema({
  paperId: { type: String },
  user: { type: String },
  makeup: { type: Number },
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
  var exam = new ExamModel({
    paperId: req.body._id,
    user: USER,
    makeup: 0,
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

module.exports = router;