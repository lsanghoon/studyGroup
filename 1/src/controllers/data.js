var async = require('async');
var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({   // MySQL 세팅
  host : 'localhost',
  port : 3306,
  user : 'ican',
  password : '1111',
  database : 'doit'
});
connection.connect(function(err){       // MySQL 컨넥션 연결
  if (err) {
    console.error('mysql connection error');
    console.error(err);
    throw err;
  }
});

/*
      환자리스트
*/
exports.patientListLoad = function(req, res) {
  connection.query('select * from users', function(err, rows) {   // 컨낵션 연결을 통해 해당 쿼리 보내기 rows 로 쿼리 결과값 받음
    console.log(rows);
    if(err) {
      console.log("Problem with MySQL"+err);
    } else {
      console.log("SUCCESS patientListLoad");
      res.end(JSON.stringify(rows));    // 성공적으로 쿼리에 대한 결과를 받을경우 JSON 형태로 만들어 response 해준다
                                        // 어디로? patientListLoad을 요청한 곳으로
    }
  });
};
