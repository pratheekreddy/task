//define a model
const mongoose=require('mongoose')
const User=mongoose.model('User',{
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
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
        type:String,
        require:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('invalid password')
            }
        }
    }
})
module.exports=user