console.log('Hello World');
console.log(process.arch);

var url = require('url');

var parsedObject = url.parse('http://www.naver.com/app?a=10&b=20');
console.log(parsedObject);
console.log(parsedObject.path);
console.log(parsedObject.host);