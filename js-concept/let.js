/**
 * All variables are accessible within functions.
 * 
**/
function variableScope() {

    var x = 10;
    let y = 20;
    const z = 30;
  
    console.log(x); // 10
    console.log(y); // 20
    console.log(z); // 30
  }
variableScope();
  
console.log(x); // ReferenceError: x is not defined
console.log(y); // ReferenceError: y is not defined
console.log(z); // ReferenceError: z is not defined
  
/**
 * var declared variables are accessible anywhere in the function scope.
 * 
 **/
if (true) {
    var a = 10;
    let b = 20;
    const c = 30;
  }
  
  console.log(a); // 10
  console.log(b); // ReferenceError: baz is not defined
  console.log(c); // ReferenceError: qux is not defined

  console.log(foo); // undefined
  var foo = 'foo';
  
  console.log(baz); // ReferenceError: can't access lexical declaration 'baz' before initialization
  let baz = 'baz';
  
  console.log(bar); // ReferenceError: can't access lexical declaration 'bar' before initialization
  const bar = 'bar';

  var foo = 'foo';
  var foo = 'bar';
  console.log(foo); // "bar"

  let baz = 'baz';
  let baz = 'qux'; // Uncaught SyntaxError: Identifier 'baz' has already been declared