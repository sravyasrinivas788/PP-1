const fs=require('fs')
const mongoose=require('mongoose')
require('dotenv').config()
const Camp=require('./models/Bootcamp')
mongoose.connect(process.env.MONGO_URI).then(()=>console.log('connected'))
const camps=JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'))
const importdata=async()=>{
    try{
        await Camp.create(camps)
    }

    catch(err){
        console.log(err)
    }
}
const deletedata=async()=>{
    try{
        await Camp.deleteMany()
    }
    catch(err){
        console.log(err)
    }
}
if(process.argv[2]==='-i'){
    importdata();
}
else if(process.argv[2]==='-d'){
    deletedata();
}