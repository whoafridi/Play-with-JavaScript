const express = require("express");
const CORS = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.port || 5000;
app.use(CORS());
app.use(express.json());

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j9yy4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    // const database = client.db('sample_mflix');
    // const movies = database.collection('movies');

    // // Query for a movie that has the title 'Back to the Future'
    // const query = { title: 'Back to the Future' };
    // const movie = await movies.findOne(query);

    // console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);
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

