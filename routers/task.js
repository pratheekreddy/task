const express= require('express')
const router =new express.Router()
const auth=require('../middleware/auth')
const Task=require('../task');

router.post('/task',auth,(req,res)=>{
    // const task=new Task(req.body)
    const task=new Task({
        ...req.body,
        owner:req.user._id
    })
    task.save().then((task)=>{
        res.send(task)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

//GET /task?completed=true/false
//limit skip
//sortBy=createdAt_asc/desc
router.get('/task',auth,async (req,res)=>{
    const match={}
    const sort={}
    if(req.query.completed){
        match.completed=req.query.completed==='true'
    }
    if(req.query.sortBy){
        let parts=req.query.sortBy.split('_')
        sort[parts[0]]= parts[1]==='desc' ? -1:1
    }
    try{
    await req.user.populate({
        path:'task',
        match,
        options:{
            limit:parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort
        }
    }).execPopulate()
    res.send(req.user.task) 
    }
    catch(e){
        res.status(500).send()
    }
})

router.get('/task/:id',auth,(req,res)=>{
    let _id=req.params.id;
    //Task.findById(_id)
    
    Task.findOne({_id,owner:req.user._id})
    .then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task);
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

router.patch('/task/:id',auth,async (req,res)=>{
    // console.log('start')
    let _id=req.params.id;
    let allowed =['description','completed']
    let updates=Object.keys(req.body)
    let isvalid=updates.every((update)=>allowed.includes(update))
    if(!isvalid){
        return res.status(400).send({error:'invalid updates'})
    }
    try
    {
        const task=await Task.findOne({_id:req.params.id,owner:req.user._id})
        if(!task){

        }
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        res.send(task)
    }
    catch(e){
        res.status(400).send()
    }
})

router.delete('/task/:id',auth,(req,res)=>{
    let _id=req.params.id
    Task.findOneAndDelete({_id:req.params.id,owner:req.user._id}).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e)=>{
        res.status(500).send()
    })
})

module.exports=router