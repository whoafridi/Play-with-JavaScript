console.log("start");

function important(username) {
    return new Promise((resolve, reject) => { 
        let res = false;
        if (res){
            setTimeout(() => {
                resolve(`resolved ${username}`)
            }, 1000);
        }
            reject(`rejected ${username}`)
     })
}

function share(share) {
    return new Promise((resolve, reject) => { 
        setTimeout(() => {
            reject(`share ${share}`)
        }, 100);
     })
}

function like(like) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(`like ${like}`)
        }, 500);
     })
}

important("coder").then( res => console.log(res)).catch(err => console.log(err));
like("coder").then( res => console.log(res)).catch(err => console.log(err));
share("coder").then( res => console.log(res)).catch(err => console.log(err));

console.log('stop');

