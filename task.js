const mongoose=require('mongoose')
const task=mongoose.model('task',{
    description:{
        required:true,
        type:String,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})
module.exports=task