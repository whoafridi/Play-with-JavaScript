// falsy value means the value which in unnecessary/ not need in a program
// remove flasy values from an array
let miscelllaneous = ["👍", NaN, undefined,false,"😒","💕"];

// passing boolean to array.filter() will return the falsy values
let emoji = miscelllaneous.filter(Boolean);

// return the falsy values
console.log(emoji); // [ '👍', '😒', '💕' ]