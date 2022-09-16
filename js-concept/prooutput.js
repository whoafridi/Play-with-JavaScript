console.log(`start`);

const fn = () =>
    new Promise((resolve, reject) => {
        console.log(1);
        resolve(2);
        console.log(3);
    });

console.log(`middle`);

fn().then(res => console.log(res)).catch(e => console.log('result ', e));

console.log(`end`);

/*

output ----->
    start
    middle
    1 
    3
    end 
    2

*/