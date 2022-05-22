const fs = require("fs");
const path = require("path");
const promise = require("fs/promises");
const assets = path.join(__dirname, "assets");
const components = path.join(__dirname, "components");
const styles = path.join(__dirname, "styles");
const project = path.join(__dirname, "project-dist");

const createHTML = async (project, components) => {
    let template = await promise.readFile(path.join(__dirname, "template.html"), "utf-8",  (e) => {
      if (e) console.log(e);
    });
    const htmlComponents = await promise.readdir(components, {withFileTypes: true});
    for (let file of htmlComponents){
      const readEl = await promise.readFile(path.join(components, file.name), "utf-8");
      if (file.isFile() && path.extname(file.name) === ".html"){
        template = template.replaceAll(`{{${path.basename(file.name, ".html")}}}`, readEl);
      }
    }   
    
    fs.writeFile(path.join(project, "index.html"), template, (e) => {
      if (e) console.log(e);
    });
  }
  
  const createCSS = async (project, styles) => {
    const styleComponents = await promise.readdir(styles, {withFileTypes: true});
    const writableStream = fs.createWriteStream(path.join(project, "style.css"));
    for (let el of styleComponents){
      if (el.isFile() && path.extname(el.name) === ".css"){
        const pathToCSSFile = path.join(styles, el.name);
        const readableStream = fs.createReadStream(pathToCSSFile, "utf-8");
        readableStream.pipe(writableStream);
      }
    }    
  }
  
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
  
  fs.mkdir(project, {recursive: true}, (err) => {
    if (err) console.log(err);
  });
  
  createCSS(project, styles);
  createHTML(project, components);
  copyDir(assets, path.join(project, "assets"));