const Camp=require('../models/Bootcamp')
const {asynchandler}=require('../middlewares/async');
const { param } = require('../routes/bootcamp');

const getbootcamps=asynchandler(async (req,res)=>{ 
   
    let query;
    const reqQuery={...req.query}
    const removef=['select','sort','page','limit']
    removef.forEach(param=> delete reqQuery[param])
    console.log(reqQuery)

    let querystr = JSON.stringify(reqQuery)
    querystr = querystr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    console.log(querystr)
    query = Camp.find(JSON.parse(querystr))
    if(req.query.select){
        const fields=req.query.select.split(',').join(' ');
        console.log(fields)
        query=query.select(fields)

    }
    if(req.query.sort){
        const sortby=req.query.sort.split(',').join(' ');
        query=query.sort(sortby)
    }
    else{
        query=query.sort('-createdAt')
    }
    const page=parseInt(req.query.page,10) ||1
    const limit=parseInt(req.query.limit,10) ||3
    const skip=(page-1)*limit
    query=query.skip(skip).limit(limit);
    const camps = await query
    res.status(200).json(camps)

   
   
})
const getsingle=asynchandler(async (req,res,next)=>{
    
        const camp=await Camp.findById(req.params.id)
        if(!camp){
            return res.status(404).json({message:'not found'})
        }
        res.status(200).json(camp)
    
    


})
const createcamp=asynchandler(async (req,res,next)=>{
    
    const newcamp=await Camp.create(req.body);

    res.status(201).json(newcamp)


   

    
})
const deletecamp=asynchandler(async (req,res,next)=>{
    
        const camp=await Camp.findByIdAndDelete(req.params.id);
        if(!camp){
            return res.status(404).json({message:'not found'})
        }
        res.status(200).json(camp)
    
   }
)
   

module.exports={getbootcamps,getsingle,createcamp,deletecamp}
