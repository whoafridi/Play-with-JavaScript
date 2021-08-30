const loadUser = () =>{
    fetch("https://randomuser.me/api/?results=5")
    .then( res => res.json())
    .then(data => displayUser(data));
}
loadUser();
const displayUser = user =>{
    const users = user.results;
    const userDiv = document.getElementById("user");
    for (const name of users){
        const p = document.createElement('p');
        p.innerText = `Name : ${name.name.first} ${name.name.last}
        Email : ${name.email}
        Location : > City: ${name.location.city}
        > state : ${name.location.state}
        > country	: ${name.location.country}
        > postcode : ${name.location.postcode}
        `;
        userDiv.appendChild(p);
    }
}