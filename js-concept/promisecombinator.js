console.log("start");

function important(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`resolved ${username}`)
        }, 1000);
    })
}

function share(share) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`share ${share}`)
        }, 100);
    })
}

function like(like) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`like ${like}`)
        }, 500);
    })
}

// checking all promises in console
/*
    it results like a promise of array 
*/
console.log(Promise.all([
    important("coder"),
    share("video"),
    like("video")
]))

// checking all promises as an array
/*
    note of one rejected all promise gonna
    failed in Promise.all() operation
*/
Promise.all([
    important("coder"),
    share("video"),
    like("video")
])
    .then(res => {
        console.log(res);
    })
    .catch(err => console.log(err))

// checking the first resolved/rejected promise
/*
    Among all promises, return the
    first succssied/failed promise.
*/
Promise.race([
    important("coder"),
    share("video"),
    like("video")
])
    .then(res => {
        console.log(res);
    })
    .catch(err => console.log(err))

// checking all promises whether it's resolved/rejected
/*
    note in Promise.allSettled() operation returns
    the both resolved/rejected promise as well.
*/
Promise.allSettled([
    important("coder"),
    share("video"),
    like("video")
])
    .then(res => {
        console.log(res);
    })
    .catch(err => console.log(err))

// checking the first resolved promise
/*
    Among all promises, return the
    first succssied promises if there is any first
    promise rejected it'll ignore that and going for
    next resolved promise.
*/
Promise.race([
    important("coder"),
    share("video"),
    like("video")
])
    .then(res => {
        console.log(res);
    })
    .catch(err => console.log(err))


console.log('stop');