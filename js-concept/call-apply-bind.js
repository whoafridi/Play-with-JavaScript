// example 1
let name = {
    firstname: "Rafi",
    lastname: "khan",
    printFullName : function (){
        console.log(this.firstname , this.lastname);
    }
}

name.printFullName();

let name2 = {
    firstname: "Raf",
    lastname: "k",
}

// function borrowing
name.printFullName.call(name2);

// example 2
let name1 = {
    firstname: "Rafi",
    lastname: "khan",
}

let printFullName = function (){
    console.log(this.firstname , this.lastname);
}

printFullName.call(name1);

let name3 = {
    firstname: "Raf-",
    lastname: "k",
}

// function borrowing
printFullName.call(name3);

// example 3
let name4 = {
    firstname: "Rafi",
    lastname: "khan",
}

let printFullName1 = function (age, t,i,j){
    console.log(this.firstname , this.lastname, age, t,i,j);
}

printFullName1.call(name1, 25, 'go');

let name5 = {
    firstname: "Raf-",
    lastname: "k",
}

// function borrowing
printFullName1.call(name3);
printFullName1.apply(name5, [1,2,3,4]);

// bind - binds the method with object and return a copy of that method/function
// it's a copy which can be invoke/used later.
let print = printFullName1.bind(name5, 3,4)
console.log(print);
// call like normal function call
print()
// binds mehod is later used so we can called it as a reuseable function