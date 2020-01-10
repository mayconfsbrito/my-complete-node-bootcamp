// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log("Unique export");
console.log(calc1.add(2, 5));

//exports
//Type 1 of import
const calc2 = require("./test-module-2");
console.log("Multiple exports - type 1");
console.log(calc2.multiply(2, 5));
//Type 2 of import
const { add, multiply, divide } = require("./test-module-2");
console.log("Multiple exports - type 2");
console.log(add(4, 2));
console.log(multiply(4, 2));
console.log(divide(4, 2));

//caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
