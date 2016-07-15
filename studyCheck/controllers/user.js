var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var fs = require('fs');
//var config = require('../knexfile');
//var knex = require('knex')(config);
var User = require('../models/user');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  user : 'ican',
  password : '11111111',
  database : 'doit'
});
connection.connect(function(err){
  if (err) {
    console.error('mysql connection error');
    console.error(err);
    throw err;
  }
});

var name;
/*
      GET 메인페이지 출석체크
*/
exports.index = function(req, res) {
  var now = new Date();
  var year= now.getFullYear();
  var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
  var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
  var today = year + '-' + mon + '-' + day;
  
  var name = req.session.userName;
  var query = connection.query('select fail from timelab where name = ? and studyDay = ?', [name, today], function(err, rows) {
    
    var fail;
    console.log(rows[0]);
    if (rows[0] == undefined) { 
      fail = 0; 
      
    } else {
      fail = rows[0].fail;
      
    }
    
    res.render('home', {
      title : 'StudyDay',
      okok : fail
    });
  });
};

/*
      GET 출석하기
*/
exports.checkGet = function(req, res) {
  var now = new Date();
  var year= now.getFullYear();
  var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
  var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
  
  var today = year + '-' + mon + '-' + day;
  var h = now.getHours();
  var m = now.getMinutes();
  
  // 지각 갑니다 10시 10분이 지나면 지각처리
  if (h > 10) {
    if (m > 10) {
      var query = connection.query('update timelab set late=1, fail=0 where name=? and studyDay=?', [req.session.userName, today], function(err, rows) {
        console.log(req.session.userName + "님은 지각하셧습니다.");
        res.redirect('/');
      });
    }
  } else {
    var query = connection.query('update timelab set success=1, fail=0 where name=? and studyDay=?', [req.session.userName, today], function(err, rows) {
      console.log(req.session.userName + "님은 지각하지 않았습니다.");
      res.redirect('/');
    });
  }
}

/**
 * Login required middleware
 */
exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

/*
      GET 로그인
*/
exports.loginGet = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/login', {
    title: '로그인'
  });
};

/*
      POST 로그인
*/
exports.loginPost = function(req, res, next) {
  var name = req.body.username;
  var query = connection.query('select * from users where uName = ?', req.body.username, function(err, rows) {
    
    var row = rows[0];
    
    if (row == undefined) {
      console.log('undefined')
      return res.redirect('/login');
      
    } else if (row.uName == name) {
      req.session.userName = row.uName;
      name = row.uName;
      req.logIn(row, function(err) {
        res.redirect('/');
      });
      
    } else {
      return res.redirect('/login');
     
    }
  });
};

/*
      GET 로그아웃
*/
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/*
      GET 회원가입
*/
exports.signupGet = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  // 회원가입 프로필 이미지 로딩
  function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function(err, filenames) {
      if (err) {
        onError(err);
        return;
      }
      onFileContent(filenames);
    });
  };
  var data;
  var imgs = [];
  readFiles('public/img/', function(filenames) {
    filenames.forEach(function(filename) {
      if (filename != '.DS_Store') {
        data = {
          id:filename.replace(".jpg",""),
          val:"../img/" + filename
        }
        imgs.push(data);
      }
    })
    res.render('account/signup', {
      title : '회원가입',
      datas : imgs
    });
  }, function(error) {
    throw error;
  });
};

/*
      POST 회원가입
*/
exports.signupPost = function(req, res, next) {
  req.assert('uName', '이름을 입력해주세요.').notEmpty();
  req.assert('uTel', '연락처를 넣어주세요.').notEmpty();
  
  var errors = req.validationErrors();
  
  if (errors) {
    req.flash('error', errors);
    return res.redirect('/signup');
  }
  
  var profileImg = req.body.chk_img + ".jpg";
  new User({
    uName: req.body.uName,
    uTel: req.body.uTel,
    uImg: profileImg
  }).save()
    .then(function(user) {
      req.logIn(user, function(err) {
        res.redirect('/');
      });
    })
    .catch(function(err) {
      if (err.code === 'ER_DUP_ENTRY') {
        req.flash('error', {msg: '사용중?'});
        return res.redirect('/signup');
      }
    })
};

/*
      GET 스터디생성
*/
exports.addStudyGet = function(req, res) {
  var query = connection.query('select uName, uImg from users', function(err,rows) {
    var cnt = rows.length;
    var user = [];
      
    for (var i = 0; i < cnt; i++) {
      user.push(rows[i]);
    }    
    res.render('add', {
      title: '스터디 생성',
      users: user
    });
  })
  
};

/*
      POST 스터디생성
*/
exports.addStudyPost = function(req, res, next) {
  var obj = {};
  var cnt = req.body.selVal.length;
  
  for (var i = 0; i < cnt; i++) {
    var query = connection.query('insert into timelab (name,studyDay) values (?, ?)',
      [req.body.selVal[i],req.body.today],
      function(err, result) {
        if (err) {
          console.log(err);
          throw err;
        }
    });
  }
  res.send(200, 'success');
};

/*
      GET 내 정보
*/
exports.accountGet = function(req, res) {
  
  var cnt,fCnt,lCnt,sCnt;
  var userName = req.session.userName;
  console.log(userName);
  var query1 = connection.query(
    'select (select count(success) from timelab where name=? and success=1) as sCnt, (select count(late) from timelab where name=? and late=1) as lCnt, (select count(fail) from timelab where name=? and fail=1) as fCnt, (select count(*) from timelab where name=?) as cnt from timelab where name=? group by name', [userName, userName, userName, userName, userName], function(err, rows) {
      var row = rows[0];
      var cnt = row.cnt,
          sCnt = row.sCnt,
          lCnt = row.lCnt,
          fCnt = row.fCnt;
      // 출석률
      var check = ((sCnt + lCnt) / cnt) * 100;
      // 지각률
      var late = (lCnt / cnt) * 100;
      // 결석률
      var fail = (fCnt / cnt) * 100;
    res.render('account/profile', {
      title: '내 정보',
      check: check,
      late: late,
      fail: fail
    });
  });
};

/*
      PUT 내 정보 변경
      Update profile
 */
exports.accountPut = function(req, res, next) {
  req.assert('uName', '이름은 빈칸일수 없습니다.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/account');
  }

  var user = new User({ id: req.user.id });
  
  user.save({
    uName: req.body.uName,
    uTel: req.body.uTel
  }, { patch: true })
  .then(function(user) {
    req.flash('success', { msg: '정보가 변경 되었습니다.' });
    res.redirect('/account');
  }).catch(function(err) {
    if (err.code === 'ER_DUP_ENTRY') {
      req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
    }
  });
};

/*
      DELETE 내 계정 삭제
*/
exports.accountDelete = function(req, res, next) {
  new User({ id: req.user.id }).destroy().then(function(user) {
    req.logout();
    req.flash('info', { msg: '계정이 삭제되었습니다.' });
    res.redirect('/');
  });
};