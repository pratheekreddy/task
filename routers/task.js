const express= require('express')
const router =new express.Router()
const Task=require('../task');

router.post('/task',(req,res)=>{
    const task=new Task(req.body)
    task.save().then((task)=>{
        res.send(task)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

router.get('/task',(req,res)=>{
    
    Task.find({}).then((task)=>{
        res.send(task);
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

router.get('/task/:id',(req,res)=>{
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

router.patch('/task/:id',(req,res)=>{
    // console.log('start')
    let _id=req.params.id;
    let allowed =['description','completed']
    let updates=Object.keys(req.body)
    let isvalid=updates.every((update)=>allowed.includes(update))
    if(!isvalid){
        return res.status(400).send({error:'invalid updates'})
    }
    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update]=req.body[update])
        task.save().then((task)=>{
            res.send(task)
        }).catch((e)=>{
            res.status(400).send()
        })
        
    })
    .catch((e)=>{
        res.status(400).send()
    })
})

router.delete('/task/:id',(req,res)=>{
    let _id=req.params.id
    Task.findByIdAndDelete(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e)=>{
        res.status(500).send()
    })
})

module.exports=router