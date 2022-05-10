const express = require('express');// Initialize App
const app = express();
const path= require('path')
const router = express.Router();
const db = require('./schema');
const mongoose= require('mongoose')
const {MongoClient}= require('mongodb')
const bodyParser = require("body-parser");

const {userModel, codeModel} = require ('./schema.js')
require('dotenv').config();
// app.use(express.static(path.resolve(__dirname, "./front_end/build")));

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

app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.use("/api", router)


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   if (req.method === 'OPTIONS') {
//       res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
//       return res.status(200).json({});
//   }
//   next();
// });


// app.get('*', (req, res) => {
//   console.log('path')
//   res.sendFile(path.join(__dirname, './front_end/build/index.html'));
// });


// router.get('/login', async (req, res, next) => {
//   console.log("Hello")
//   try{
//     res.send("Hello to logi");
//   }
//   catch(e){
//     res.send(e)
//   }
// });

router.post('/login', async (req, res, next) => {
  try{
    console.log(req.body)
    const result= await checkUser(client, {email: req.body.email, password: req.body.password})
    console.log(result)
    res.send(result);
  }
  catch(e){
    res.send(e)
  }
});


router.post("/signin/",async (req,res) => {
  try{
    console.log(req)
  const user= await createUser(client, {name: req.body.name, email: req.body.email , password: req.body.password})
  console.log(user)
  res.send(user);}
  catch(e){return e}
  });


router.post('/submit/',async (req,res) => {
  console.log("putting submissions" , req.body)
  const result= await createCode(client, {user_id: req.body.user_id,  code: req.body.code, input: req.body.input, output: req.body.output, execution_time:req.body.execution_time, submitted_at: req.body.submitted_at})
  res.send(result);
});


router.get('/submit/', async (req, res) => {
  // console.log("get submissions" , req.query.user_id)
  const submissions= await findAllSubmissions(client, {user_id: req.query.user_id}, { session })
  res.send(submissions);
});

router.delete('/submit/', async (req, res) => {
  const submissions= await delteAllSubmissions(client, { session })
  res.send(submissions);
});
    

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
  const result= await client.db("test").collection("users").findOne({$and:[
    {email : user.email},
    {password : user.password}
  ]})
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
  console.log(user)
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

async function delteAllSubmissions(client, user){
  //sort based on the latest submissions 
  const result= await client.db("test").collection("codes").deleteMany({})
  if(result){
    // console.log("user exists", result)
    return "deleted"
  }
  else {
    console.log('user doesn\'t exisit')
  }
}

async function createCode(client, user) {
  result= await client.db("test").collection("codes").insertOne(
    new codeModel({
    user_id: user.user_id,
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

