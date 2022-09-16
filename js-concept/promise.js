/*

    Three states of promises
    1. pending: initial state, neither fulfilled nor rejected.
    2. fulfilled: meaning that the operation was completed successfully.
    3. rejected: meaning that the operation failed.

*/


console.log('start');

const sub = new Promise((resolve, reject) => {
    setTimeout(() => {
        const result = true;
        if (result) resolve('done')
        else reject('fail');
    }, 1000);
})

sub.then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

console.log(sub)

console.log('stop');

