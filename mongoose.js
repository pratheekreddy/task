// const mongo= require('mongodb')
// const Mclient =mongo.MongoClient
const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manage',{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true})