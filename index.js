var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var cors = require('cors')
var path = require('path')
const dotenv = require('dotenv');
const ambulanceRouter = require('./routes/ambulance_router')
const userRouter = require('./routes/user_router')
const authRouter = require('./routes/auth_router')
const connection = require('./service/connect')
const kaijuRouter = require('./routes/kaijuRouter')
dotenv.config();

var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://medirider2023:ky5Kgw50uzb8O1vO@cluster0.etfbdao.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
    console.log('connected to the database')
    if (err) throw err;
    var dbo = db.db("medirider");
    dbo.collection("ambulance").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });


// mongoose.connect('mongodb+srv://medirider2023:ky5Kgw50uzb8O1vO@cluster0.etfbdao.mongodb.net/?retryWrites=true&w=majority')

// //mongoose.connect('mongodb://localhost:27017/sliit01')

// mongoose.connection.on("connected",()=>{
//     console.log('connected to the database')
// })

// mongoose.connection.on("error",(err)=>{
//     if(err){
//         console.log('connection error : ',err)
//     }
// })
connection()
app.use(cors())

app.use(bodyparser.json())

app.use(express.static(path.join(__dirname,'public')))

app.use('/api/ambulance',ambulanceRouter)
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/common',kaijuRouter)

app.listen(process.env.PORT,()=>{
    console.log('server started in port : ',process.env.PORT)
})