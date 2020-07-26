require('../mongoose')
const Task=require('../task')

// Task.findByIdAndDelete('5f1bf3491f3f6d1d842593c3').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskCount= async (id)=>{
    const task=await Task.findByIdAndDelete(id)
    const count=await Task.countDocuments({completed:false})
    return count;
}

deleteTaskCount('5f1c00f5cbe18528b884a9f0').then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})