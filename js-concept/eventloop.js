/*

    Things learned: https://www.educative.io/answers/what-is-an-event-loop-in-javascript
    1. Browser has superpowers that are lent to JS engine to execute some tasks, these superpowers include web API's such as console, location, DOM API, setTimeout, fetch, local storage.
    2. Callback functions and event handers are first stored in Web API environment and then transferred to callback queue.
    3. Promises and mutation observer are stored in API environment and then transferred to microtask queue.
    4. Event loop continuously observes call stack and when it is empty it transfers task to call stack.
    5. Micro task is given priority over callback tasks.
    6. Too many micro tasks generated can cause Starvation (nit giving time to callback tasks to execute).

*/

console.log('start');

setTimeout(function cb() {
    console.log(`subscribe 1`)
}, 1000);

setTimeout(function cb() {
    console.log(`subscribe 2`)
}, 100);

fetch('https://jsonplaceholder.typicode.com/photos')
    .then(function cbf(res) {
        console.log('result fecthed', res);

        setTimeout(function cb() {
            console.log(`result from fetch`);
        }, 1000);
    });

setTimeout(function cb() {
    console.log(`subscribe 3`)
}, 100);

console.log('end');


/*

> output =>
start
end 
result fecthed 

subscribe 2 
subscribe 3 
subscribe 1
result from fetch

*/