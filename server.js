const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const app=express()
app.use(express.json())

const bootcamp=require('./routes/bootcamp')
mongoose.connect(process.env.MONGO_URI).then(()=>console.log('connected'))
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()

})
app.use('/api/bootcamps',bootcamp)
app.listen(process.env.PORT,()=>{
    console.log("yes")
})
