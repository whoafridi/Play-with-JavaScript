// // synchronous code
// console.log("test case 1");
// console.log("test case 2");
// console.log("test case 3");

// // asynchronous code
// console.log("test case 1");

// setTimeout(() => {
//     console.log("test case 2");
// }, 010);

// console.log("test case 3");

// // sync vs async
// console.log("start");

// function important(username) {
//     setTimeout(() => {
//         return `subscribe ${username}`
//     }, 1000);
// }

// const msg1 = important("coder");
// console.log(msg1)

// console.log('stop');

// // sync vs async
// console.log("start");

// function important1(username, cb) {
//     setTimeout(() => {
//         cb(`subscribe ${username}`)
//     }, 0);
// }

// const msg = important1("coder", (msg) => { console.log(msg) });


// console.log('stop');

// callback hell // pyramid of doom
console.log("start");

function important1(username, cb) {
    setTimeout(() => {
        cb(`subscribe ${username}`)
    }, 1000);
}

function share(share, cb) {
    setTimeout(() => {
        cb(`subscribe ${share}`)
    }, 100);
}

function like(like, cb) {
    setTimeout(() => {
        cb(`subscribe ${like}`)
    }, 500);
}

const msg2 = important1("coder", (msg) => {
    console.log(msg)
    share("share ", (share) => {
        console.log(share);
        like("like", (like) => {
            console.log(like)
        })
    })
});

console.log('stop');

