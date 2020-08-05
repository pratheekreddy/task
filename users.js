//define a model
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const Task=require('./task')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        unique:true,
        required:true,
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        },
        trim:true,
        lowercase:true
    },
    age:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error('age cant be negitive')
            }
        },
        default:0
    },
    password:{
        required:true,
        type:String,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('invalid password')
            }
        }
    },
    avatar:{
        type:Buffer
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})

userSchema.methods.generateToken=async function(){
    let user=this
    let token=jwt.sign({_id:user._id.toString()},'taskapp')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token;
}

userSchema.virtual('task',{
    ref:'task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON= function(){
    let user=this
    let userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
} 

userSchema.statics.findByCred= async(email,password)=>{
    const user = await Users.findOne({email:email})
    // console.log(user) i  i json
    if(!user){
        console.log('user not found')
        throw new Error('unable to login')
    }
    const ismatch= await bcrypt.compare(password,user.password)
    if(!ismatch){
        throw new Error('unable to login')
    }
    return user
}

// used to hash password
userSchema.pre('save',async function(next){
    const user=this // this is the current document
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }

    next()
})
//delete user task when user is removed
userSchema.pre('remove',async function(next){
    const user=this
    await Task.deleteMany({owner:user._id})
    next()
})

const Users=mongoose.model('User',userSchema)

module.exports=Users