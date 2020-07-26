const mongo= require('mongodb')
const Mclient =mongo.MongoClient
// const object=mongo.ObjectID
// let id= new object()
// console.log(id.getTimestamp())

const conn='mongodb://127.0.0.1:27017'
//db name
const dbname='task-d'

const collection='users'


////insertone and many
// Mclient.connect(conn,{useNewUrlParser : true, useUnifiedTopology: true },(error,client)=>{
//     if(error){
//         return console.log('unable to connect....')
//     }
//     const db=client.db(dbname)
//     db.collection('users').insertMany([{
//         name:'pratheek',
//         age:22,
//         gender:'m'
//      }
//      ,
//         {
//             name:'gautam',
//             age:40
//         }]
//     ,(error,result)=>{
//         if(error){
//             return console.log(error)
//         }
//         console.log(result.ops)
//     })
// })


////delete
// Mclient.connect(conn,{useNewUrlParser:true,useUnifiedTopology: true},(error,client)=>{
//     if(error){
//         return console.log('not able to connect')
//     }
//     const db=client.db(dbname)
//     const promise=db.collection(collection).deleteMany({name:'pratheek'}).then((results)=>{
//         console.log(results)
//     }).catch((error)=>{
//         console.log(error)
//     })
// })




////update
// Mclient.connect(conn,{useNewUrlParser:true,useUnifiedTopology: true},(error,client)=>{
//     if(error){
//         console.log('unable to connect....')
//     }
//     const db=client.db(dbname)
//     const promise=db.collection(collection).updateMany({name:'pratheek'},
//     {
//         $set:{
//             age:30
//         }
//     }
//     )

//     promise.then((result)=>{
//         console.log(result)
//     }).catch((error)=>{
//         console.log(error)
//     })
// })



// //find
// Mclient.connect(conn,{useNewUrlParser:true,useUnifiedTopology: true},(error,client)=>{
//     if(error){
//         return console.log('unable to connect....')
//     }
//     const db=client.db(dbname)
//     let curser=db.collection(collection).find({name:'pratheek'})
//     // console.log(curser)
//     curser.toArray((err,result)=>{
//         console.log(result)
//     })
// })
// console.log('start')




//findone
Mclient.connect(conn,{useNewUrlParser:true,useUnifiedTopology: true},(error,client)=>{
    if(error){
        return console.log('unable to connect....')
    }
    const db=client.db(dbname)
    db.collection(collection).findOne({name:'pratheek'},(error,results)=>{
        if(error){
            return console.log(error)
        }
        console.log(results)
    })
})



