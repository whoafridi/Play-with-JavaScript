/*

    Regular vs Arrow Function
    https://medium.com/geekculture/regular-vs-arrow-function-1f8140fbcece
    1. Syntax
    2. Arguments binding
    3. this
    4. new keyword
    5. No duplicate named parameters
    6. Function Hoisting
    7. Methods

*/

// 1. Syntax
// ES5
var add = function(x, y) {
    return x + y
};// ES6
let add = (x, y) =>  x + y
// 2. Arguments binding
function regularFunction(a,b) {
    console.log(arguments)
}regularFunction(1,2)
// Arguments[1,2]

const arrowFunction = (a,b) => {
    console.log(arguments)
}arrowFunction(1,2)
//ReferenceError: arguments is not defined

However, if you want to access arguments in an arrow function, you can use the rest operator:

var arrowFunction = (...args) => {
    console.log(...args)
}arrowFunction(1,2)
// 1 2

// 5️. No duplicate named parameters
// ✅ will work 
function add(a, a) {}// ❌ will not work 
'use strict';
function add(a, a) {}// Uncaught SyntaxError: Duplicate parameter name not allowed in this context

// Arrow functions can never have duplicate named parameters, whether in strict or non-strict mode.

const arrowFunc = (a,a) => {}// Uncaught SyntaxError: Duplicate parameter name not allowed in this context

// 6️. Function Hoisting
normalFunc()
function normalFunc() {
    return "Normal Function"
}// "Normal Function"


arrowFunc()
const arrowFunc = () => {
    return "Arrow Function"
}// ReferenceError: Cannot access 'arrowFunc' before initialization