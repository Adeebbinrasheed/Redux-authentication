const notFound=(req,res,next)=>{
    res.status(404).json({message:"required route does not found"})
}

module.exports=notFound