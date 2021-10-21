const express = require("express");
const CORS = require('cors');
const app = express();
const port = process.env.port || 5000;
app.use(CORS());
app.use(express.json());

const users = [
    {id:1,name:"hello",email:"1@gmail.com"},
    {id:2,name:"hello",email:"1@gmail.com"},
    {id:3,name:"hello",email:"1@gmail.com"},
    {id:4,name:"hello",email:"1@gmail.com"}
]
app.get('/', (req,res)=>{
    res.send("hello, from node server");
});

app.get("/users", (req,res) =>{ 
    const search = req.query.search;
    if(search){
        const searchresult = users.filter( user => user.name.toLowerCase().includes(search))
        res.send(searchresult)
    }
    res.send(users)});

app.post('/users', (req,res)=>{
    const user = req.body;
    user.id = users.length;
    users.push(user);
    console.log('Hitting post')
    res.json(user);
})

app.get("/users/:id", (req,res) =>{ 
    const id = req.params.id;
    const user = users[id];
    res.send(user);
});

app.listen(port,()=>{console.log("listing from port", port)})
