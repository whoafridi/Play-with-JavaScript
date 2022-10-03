/*
Function expressions are invoked to avoid polluting the global scope. Instead of your program being aware of many different functions, when you keep them anonymous, they are used and forgotten immediately.
*/

/*
    Hoisting
*/
// Function declarations are hoisted but function expressions are not.

// declaration
doStuff();

function doStuff() { };

// expression
doStuff();

const doStuff = () => { };

/*
    In Callback
*/

// declaration
function mapAction(item) {
    // do stuff to an item
}
array.map(mapAction)
// mapAction will use at everywhere as global scope which isn;t needed

// expression
array.map(item => { //do stuff to an item })

const mapAction = function (item) {
    // do stuff to an item
}
array.map(mapAction)
// but here not available outside function

/*
Summary

In short, use function declarations when you want to create a function on the global scope and make it available throughout your code. Use function expressions to limit where the function is available, keep your global scope light, and maintain clean syntax.

*/