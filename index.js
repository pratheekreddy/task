const express=require('express');
const app=express()
require('./mongoose');
const userRoutes=require('./routers/user')
const taskRoutes=require('./routers/task')
const jwt=require('jsonwebtoken')


app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use(express.json())
app.use(userRoutes)
app.use(taskRoutes)

app.listen(3000,()=>console.log('listning....'))

// const Task=require('./task')
// const User=require('./users')
// const main=async ()=>{

//     const user= await User.findById('5f2544175bcf6a23f8f24f94')
//     // console.log(user)
//     await user.populate('task').execPopulate()
//     console.log(user.task) 

//     // const task=await Task.findById('5f2544595bcf6a23f8f24f98');
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
// }
// main()
// const myFunction=async()=>{
//     const token=jwt.sign({email:'kattap@gmail.com'},'taskapp')
//     console.log(token)
//     console.log(jwt.verify(token,'taskapp'))
// }
// myFunction()