const fs = require("fs");
const path = require("path");
const folder = path.join(__dirname, "secret-folder");

fs.readdir(folder, {withFileTypes: true}, (err, files) => {
  if (err) console.log(err);
  else{
    for (let dirent of files){
      if (dirent.isFile()){
        const ext = path.extname(dirent.name);
        const base = path.basename(dirent.name, ext);
        const file = path.join(folder, dirent.name);
        fs.stat(file, (error, stats) => {
          if (error) {
            console.log(error);
          }
          else {
            let size = stats.size;
            size /= 1024;
            console.log(base + " - " + ext.slice(1) + " - " + size.toFixed(3) + "kb");
          }
        });
      }
    }
  }
});

console.log("Files: ");