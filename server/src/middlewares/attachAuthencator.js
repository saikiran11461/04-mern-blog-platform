const attachAuthenticator = (req,res,next)=>{
    if(!req.user || !req.user.id){
        return res.send("user not authenticated")
    }

    req.body.author = req.user.id;
    next()
}


module.exports = {attachAuthenticator}