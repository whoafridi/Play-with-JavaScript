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

important("coder")
    .then(res => {
        console.log(res)
        like("coder").then(res => {
            console.log(res)
            share("coder").then(res => {
                console.log(res)
            })
        })
    }).catch(err => console.log(err))

console.log('stop');

