const fs = require("fs");
const promise = require("fs/promises");
const path = require("path");
const folder = path.join(__dirname, "files");
const folderCopy = path.join(__dirname, "files-copy");

const copyDir = async (folder, folderCopy) => {
  await promise.mkdir(folderCopy, {recursive: true});

  fs.readdir(folderCopy, {withFileTypes: true}, (e, data) => {
    if (e) console.log(e);
    for (let el of data){
      fs.access(path.join(folder, el.name), (err) => {
        if (err){
          fs.rm(path.join(folderCopy, el.name), {recursive: true}, (err) => {
            if (err) console.log(err);
          });
        }
      });
    }
  });

  fs.readdir(folder, {withFileTypes: true}, (e, data) => {
    if (e) console.log(e);
    for (let el of data){
      if (el.isFile()){
        fs.copyFile(path.join(folder, el.name), path.join(folderCopy, el.name),
            (err) => {
              if (err) console.log(err);
            } 
        );
      }
      if (el.isDirectory()){
        copyDir(path.join(folder, el.name), path.join(folderCopy, el.name));
      }
    }
  });
}

copyDir(folder, folderCopy);
