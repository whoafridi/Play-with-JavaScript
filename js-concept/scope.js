// block scope
{
    // compound statement
}

if(true) console.log('hello');

// shadowing > var

var a = 100;
{
    var a = 10;

    console.log(a);
}

console.log(a);
/*
10
10
*/
// in var it chnages because of shadowing 

// shadowing > let
let b = 20;
{
    let b = 200;

    console.log(b);
}

console.log(b);
/*
200
20
*/
// in let because of block scope it can't chnage it. both have different scope one is block & another one is other

// shadowing > const
const c = 30;
{
    const c = 300;

    console.log(c);
}

console.log(c);
/*
300
30
*/
// in const because of block scope it can't chnage it. both have different scope one is block & another one is other (same as let)
