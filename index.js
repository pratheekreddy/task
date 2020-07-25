const express=require('express');
const app=express()
require('./mongoose');
const Users=require('./users');
const Task=require('./task');

app.post('/users',(req,res)=>{
    const user=new User(req.body);
    user.save().then((user)=>{
        res.status(201).send(user)
    })
    .catch((error)=>{
        res.status(400)
        res.send(error)
        // res.status(400).send(error)
    })
})

app.get('/user',(req,res)=>{
    Users.find({}).then((users)=>{
        res.send(users)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

app.get('/user/:id',(req,res)=>{
    const _id=req.params.id;
    Users.findById(_id).then((users)=>{
        if(!users){
            return res.status(404).send()
        }
        res.send(users)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

app.post('/task',(req,res)=>{
    const task=new Task()
    task.save().then((task)=>{
        res.send(task)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

app.get('/task',(req,res)=>{
    
    Task.find({}).then((task)=>{
        res.send(task);
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

app.get('/task/:id',(req,res)=>{
    let _id=req.params.id;
    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task);
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

app.listen(3000)