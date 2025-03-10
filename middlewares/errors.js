const errorhandle=(err,req,res,next)=>{
    console.log(err)
    if(err.name==='CastError'){
        const message=`Bootcamp not found with id ${err.value}`
        return res.status(404).json(message)
        

        
    }
    if (err.name === "ValidationError") {
        const errors = Object.keys(err.errors).map((key) => ({
            field: key,
            message: err.errors[key].message
        }));

        return res.status(400).json({ 
            success: false, 
            message: "Validation error",
            errors 
        });
    }
    if(err.code===11000){
        const fields = Object.keys(err.keyValue); 
        const message = `Duplicate value entered for field(s): ${fields.join(', ')}`;
        return res.status(400).json({ 
            success: false, 
            message,
            fields 
        });
    }
    res.status(500).json(err.message)
}
module.exports={errorhandle}