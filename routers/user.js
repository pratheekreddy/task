const express= require('express')
const router =new express.Router()
const Users=require('../users');
const auth =require('../middleware/auth')

router.post('/users',async (req,res)=>{
    const user=new Users(req.body);
    try{
        await user.save()
        let token=await user.generateToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
    // user.save().then((user)=>{
    //     res.status(201).send(user)
    // })
    // .catch((error)=>{
    //     res.status(400)
    //     res.send(error)
    // })
})

router.post('/users/login',async (req,res)=>{
    try{
        const user =await Users.findByCred(req.body.email,req.body.password)
        const token=await user.generateToken()
        res.send({user,token})
    }catch(e){
        res.status(401).send(e)
    }
})

router.post('/users/logout',auth,async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutall',auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.status(200).send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me',auth ,async (req,res)=>{
    res.send(req.user)

    // Users.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
})

router.get('/users/:id',(req,res)=>{
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

router.patch('/users/:id',(req,res)=>{
    const _id=req.params.id
    const updates=Object.keys(req.body)
    const allowed=['name','email','password','age']
    const isvalid=updates.every((update)=>allowed.includes(update))

    if(!isvalid){
        return res.status(400).send({error:'invilad update'})
    }

    Users.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        updates.forEach((update)=>user[update]=req.body[update])
        user.save().then((user)=>{
            res.send(user)
        }).catch((e)=>{
            res.status(400).send()
        })
        
    })
    .catch((e)=>{
        res.status(400).send()
    })
})

router.delete('/users/:id',(req,res)=>{
    let _id=req.params.id
    Users.findByIdAndDelete(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })
})

module.exports=router