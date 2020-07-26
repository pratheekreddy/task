require('../mongoose')
const User=require('../users')

// User.findByIdAndUpdate('5f1becdc0a50d521d4b97467',{age:22}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeCount= async (id,age)=>{
    const user=await User.findByIdAndUpdate(id,{age})
    const count= await User.countDocuments({age})
    return count
}

updateAgeCount('5f1becdc0a50d521d4b97467',2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})