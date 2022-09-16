console.log("start")

const promp = new Promise((resolve, reject) => {
    console.log(1);
    resolve(2)
    console.log(3)
})

promp.then(res => console.log(res)).catch(e => console.log(e));

console.log("end")
/*

    output >
    start 
    1
    3
    end 
    2 

*/

console.log("start")

const prom = new Promise((resolve, reject) => {
    console.log(1);
    console.log(3);
    resolve(2)
})

prom.then(res => console.log(res)).catch(e => console.log('result ', e));

console.log("end")
/*

    output >
    start 
    1
    3
    end 

*/


