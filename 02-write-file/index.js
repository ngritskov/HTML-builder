const path = require("path");
const fs = require("fs");
const readline = require("readline");
const process = require("process");

let stream = fs.createWriteStream(path.join(__dirname, "message.txt"));
const rl = readline.createInterface({ 
  input:  process.stdin,
  output: process.stdout
});

rl.on("SIGINT", () => {
  rl.close();
  console.log("\nGood bye!");
});
rl.on('line', (input) => {
  if (input.trim() === "exit") {
    rl.close();
    console.log("Good bye!");
  }
  else {
    console.log("Enter your message:");
    stream.write(input + "\n");
  }
});

console.log("Welcome!");
console.log("Enter your message:");
