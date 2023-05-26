exports.createPostValidator=(req,res,next)=>{
    //title check
    req.check('title','write a title').notEmpty();
    req.check('title','title must be between 4 and 200 char').isLength({
        min:4,
        max:200
    });
    //body check
    req.check('body','write a body').notEmpty();
    req.check('body','body must be between 10 and 200 char').isLength({
        min:10,
        max:200
    });
    //check for errors
    const errors=req.validationErrors();
    //if error in first
    if(errors){
        const firstError=errors.map((error)=> error.msg)[0];
        return res.status(400).json({error:firstError})
    }
    next();
};