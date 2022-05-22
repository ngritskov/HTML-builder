const fs = require("fs");
const path = require("path");
const styles = path.join(__dirname, "styles");
const project = path.join(__dirname, "project-dist");

fs.readdir(styles, {withFileTypes: true}, (err, files) => {
  if (err) console.log(err);
  else {
    let writableStream = fs.createWriteStream(path.join(project, "bundle.css"));
    for (let el of files){
      if (el.isFile() && path.extname(el.name) === ".css"){
        const css = path.join(styles, el.name);
        let readableStream = fs.createReadStream(css, "utf-8");
        readableStream.pipe(writableStream);
      }
    }
    console.log("bundle.css is sucessfully created");
  }
});