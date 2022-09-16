console.log("start")

const promp = new Promise((resolve, reject) => {
     console.log(1);
     resolve(2)
})

promp.then(res => console.log(res)).catch(e=> console.log(e));

console.log("end")

/*

    output >
    start 
    1
    end 
    2

*/
