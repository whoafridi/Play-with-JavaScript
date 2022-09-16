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
            reject(`like ${like}`)
        }, 500);
    })
}

const result = async () => {

    const msg = await important("coder")
    const msg1 = await share("video")
    const msg2 = await like("video")

    console.log(`${msg} \n${msg1} \n${msg2}`);

}
// result();

const resultAction = async () => {
    try {

        const msg = await important("coder")
        const msg1 = await share("video")
        const msg2 = await like("video")
        console.log(`${msg} \n${msg1} \n${msg2}`);
    } catch (err) {
        console.error(`promises failed-${err}`)
    }
}
resultAction();


console.log('stop');

