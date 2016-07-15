var fs = require('fs');

fs.readFile('textfile.txt', 'utf-8', function(error,data) {
  console.log(data);
})

var readSync = fs.readFileSync('textSync.txt', 'utf-8');
console.log(readSync);
