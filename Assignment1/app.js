// const fibonacci = require("./fibonacci");
const child_process = require("child_process");
console.log("================================App Starts================================");

child_process.spawn("node",["./fibonacci.js"], {stdio:"inherit"});
// const fib30 = fibonacci(30);
// console.log("Fibonacci of  30: "+fib30);
// const fib15 = fibonacci(-15);
// console.log("Fibonacci of -15: "+fib15);
console.log("================================App   Ends================================");