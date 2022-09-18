/*
    Example - 1
*/

// let a = []   // var a = []   // const a = []
// let b = []   // var b = []   // const b = []

// console.log(a == b);
// console.log(a === b);
/*
    output ->
    false 
    false
*/

/*
    Example - 2
*/

// let a = []
// let b = a

// console.log(a == b);
// console.log(a === b);
/*
    output ->
    true 
    true
*/

/*
    Example - 3
*/

// let a = [10]
// let b = [10]

// console.log(a[0] == b[0]);
// console.log(a[0] === b[0]);
/*
    output ->
    true 
    true
*/

/*
    Example - 4
*/

let a = [1,2,3,4]
const text = 1
console.log(...a);
/*
    output ->
    1 2 3 4
    explanation - desturcture return the output
    as an integer number format no comma separated
*/

/*
    Example - 5
*/

isNaN('Joker12');        // => true
Number.isNaN('Joker12'); // => false
/*
isNaN('Joker12') converts the argument 'Joker12' 
into a number, which is NaN. Thus the function returns true.

On the other side, Number.isNaN('Joker12') checks
without conversion if the argument is NaN. The 
function returns false because 'Joker12' doesn't equal NaN.
*/

/*
    Example - 6
*/

/*

    let data = {name: "ani"}
    console.log(delete data.name); // return boolean -> true
    console.log(data); // return empty array

*/


/*
    Example - 7
*/

// let data = {name: "ani"}
// console.log(delete data); // return boolean -> false
// we can't delete data . we delete an object from data

/*
    Example - 8
*/

// const data = ['peter', 'p','0'] 
// const [y] = data; // concept of destructure
// console.log(y); // peter

/*
    Example - 9
*/

// const data = ['peter', 'p','0'] 
// const [y, z] = data; // concept of destructure
// console.log(y, z); // peter p

/*
    Example - 10
*/

// const data = ['peter', 'p','0'] 
// const [,y] = data; // concept of array destructure
// console.log(y); // p *if use ,, then return 0

/*
    Example - 11
*/

// const data = {name:'anil', age:20}
// const {name, age} = data // concept of destructure
// console.log(name, age); // anil 20

/*
    Example - 12
*/

// const data = {name:'anil', age:20}
// const info = {city: "ctg"}
// d = {data, ...info} 
// console.log(d); 

/*
{
  "data": {
    "name": "anil",
    "age": 20
  },
  "city": "ctg"
}
*/

/*
    Example - 13
*/

const data = {name:'anil', age:20, city:'dhk'}
const info = {city: "ctg"}
d = {...data, ...info}
console.log(d);

/*
{
  "name": "anil",
  "age": 20,
  "city": "ctg"
}
*/