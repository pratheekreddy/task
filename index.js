const express=require('express');
const app=express()
require('./mongoose');
const userRoutes=require('./routers/user')
const taskRoutes=require('./routers/task')
const jwt=require('jsonwebtoken')

app.use(express.json())
app.use(userRoutes)
app.use(taskRoutes)

app.listen(3000,()=>console.log('listning....'))

// const myFunction=async()=>{
//     const token=jwt.sign({email:'kattap@gmail.com'},'taskapp')
//     console.log(token)
//     console.log(jwt.verify(token,'taskapp'))
// }
// myFunction()