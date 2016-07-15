var fs = require('fs');

var data = 'Hello Node.js ...!!';

fs.writeFile('textWrite.txt', data, 'utf-8', function(error) {
  console.log('비동기식 쓰기 완료');
})

fs.writeFileSync('textWrite.txt', data, 'utf-8');
console.log('동기식 쓰기 완료');