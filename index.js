const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://mymongodb1:xfewhmeeRskRn1dO@cluster0.jodbj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    async function run() {
        try {
          await client.connect();
          const database = client.db("master");
          const usersCollection = database.collection("users");
          // get api
          app.get('/users', async (req, res) => {
              const cursor = usersCollection.find({});
              const users = await cursor.toArray();
              res.send(users);

          })  
          // post api
          app.post('/users', async (req, res) => {
              const newUser = req.body;
              const result = await usersCollection.insertOne(newUser);
              console.log('got new user', req.body);
              console.log('added user', result);
              res.json(result);
          })
        } 
        finally {
        //   await client.close();
        }
      }
      run().catch(console.dir);
});


// if hitted undefined


const port = process.env.PORT || 5000;

app.get('/',  (req, res) => {
    res.send('nodemon  is awesome');
});

app.listen(port, () => {
    console.log('listening to port', port);
});

// user : mymongodb1
// pass : xfewhmeeRskRn1dO



// const users =[

//     {id: 0, name: 'Asha', email: 'asha123@gmail.com', phone : '01873626488'},
//     {id: 1, name: 'jisnu', email: 'jisnu@gmail.com', phone : '01873626488'},
//     {id: 2, name: 'popy', email: 'popy@gmail.com', phone : '01873626488'},
//     {id: 3, name: 'tanu', email: 'tanu@gmail.com', phone : '01873626488'},
//     {id: 4, name: 'manu', email: 'manu@gmail.com', phone : '01873626488'},
//     {id: 5, name: 'mitu', email: 'mitu@gmail.com', phone : '01873626488'},
//     {id: 6, name: 'titu', email: 'titu@gmail.com', phone : '01873626488'}
// ]
// app.get('/users', (req, res) => {
//     const search = req.query.search;
//     if(search) {
//         const searchResult = users.filter(user => user.name.toLocaleLowerCase().includes(search));
//         res.send(searchResult);
//     }
//     else{
//         res.send(users)
//     } 
// });

// // app.METHOD
// app.post('/users', (req, res) => {
//     const newUser = req.body;
//     newUser.id = users.length;
//     users.push(newUser);
//     console.log('hitting the post', req.body)
//     // res.send('inside post')
//     res.json(newUser)
// })

// app.get('/fruits', (req, res) => {
//     res.send(['aam', 'kola', 'apple'])
// });

// app.get('/fruits/kola/kashmiri', (req, res) => {
//     res.send('get kashmiri kola')
// });

// app.get('/users/:id', (req, res) => {
//     const id = req.params.id;
//     const user = users[id];
//     res.send(user);
// });