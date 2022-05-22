const path = require("path");
const fs = require("fs");

const txtPath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(txtPath , 'utf-8');

stream.on('data', function(chunk){
  console.log(chunk);
});