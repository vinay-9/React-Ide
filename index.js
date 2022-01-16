const express = require('express');// Initialize App
const app = express();
const path= require('path')
const router = express.Router();
const db = require('./schema');
const mongoose= require('mongoose')
const {MongoClient}= require('mongodb')
const bodyParser = require("body-parser");

const {userModel, codeModel} = require ('./schema.js')

// Start server on PORT 5000
PORT= process.env.PORT || 5000
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started! ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri= "mongodb+srv://vinay:vinayMongodb@cluster0.gpac9.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
let session= null
try {
    // Connect to the MongoDB's cluster
    client.connect().then((res)=> {
      console.log('connected to the client')
      session = client.startSession();
      listDatabases(client);
    })
    .catch(e=>{console.log(e) 
      session.endSession()
    });
      
} catch (e) {
    console.error(e);
} finally {
    client.close();
}
router.post('/api/login', async (req, res, next) => {
  try{
    const result= await checkUser(client, {email: req.body.email, password: req.body.password})
    console.log(result)
    res.send(result);
  }
  catch(e){
    res.send(e)
  }
});


router.post("/api/signin",async (req,res) => {
  try{
  const user= await createUser(client, {name: req.body.name, email: req.body.email , password: req.body.password})
  console.log(user)
  res.send(user);}
  catch(e){return e}
  });


router.post('/api/submit',async (req,res) => {
  const result= await createCode(client, {id: req.body.id,  code: req.body.code, input: req.body.input, output: req.body.output, execution_time:req.body.code, submitted_at: req.body.submitted_at})
  res.send(result);
});


router.get('/api/submit/', async (req, res) => {
  console.log(req.body)
  console.log(req.body.user_id)
  console.log(req.params)
  console.log(req.params.user_id)
  const submissions= await findAllSubmissions(client, {user_id: req.body.user_id}, { session })
  res.send(submissions);
}); 
    
app.use("/", router);
app.use(express)

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, './front_end/build', 'index.html'));
// });



function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}

async function checkUser(client, user){
  const result= await client.db("test").collection("users").findOne(user)
  if(result){
    return result._id
  }
  else {
    errorHandler(err)
  }
}
async function createUser(client, user) {
   try{result= await client.db("test").collection("users").insertOne(
    new userModel({
      name: user.name,
      email: user.email,
      password: user.password,
      last_active: Date.now(),
    })
   )
   return (result)
  }
   catch(e){
      console.log(e)
   }
}

async function findAllSubmissions(client, user){
  //sort based on the latest submissions 
  const result= await client.db("test").collection("codes").find({user_id: user.user_id}).sort({submitted_at: -1})
  if(result){
    // console.log("user exists", result)
    const array_res= await result.toArray();
    return array_res
  }
  else {
    console.log('user doesn\'t exisit')
  }
}
async function createCode(client, user) {
  result= await client.db("test").collection("codes").insertOne(
    new codeModel({
    id: user.id,
    code: user.code,
    input: user.input,
    output: user.output,
    submitted_at: user.submitted_at,
    execution_time: user.execution_time
  }))
  return (result)
}
async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

