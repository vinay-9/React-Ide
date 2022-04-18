
const express = require('express');// Initialize App
const app = express();
const path= require('path')
const router = express.Router();
const db = require('./schema');
const mongoose= require('mongoose')
const {MongoClient}= require('mongodb')
  

// Start server on PORT 5000
PORT= process.env.PORT || 5000
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started! ${PORT}`);
});

app.get('/api', (req, res, next) => {
  
  res.send('Node.js Search and Filter');
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './front_end/build', 'index.html'));
});

app.use(express)


const uri= "mongodb+srv://vinay:vinayMongodb@cluster0.gpac9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();
console.log(client)
listDatabases(client);

function listDatabases(client){
  const databasesList= client.db().admin().listDatabases
  console.log(databasesList)
}


    //  "npm run build --prefix front_end",

