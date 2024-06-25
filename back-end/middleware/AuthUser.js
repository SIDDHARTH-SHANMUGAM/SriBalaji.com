const jwt = require('jsonwebtoken');

const authUser= async(req, res, next)=>{
    try{
        const token = req.body.token;
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    }
    catch(err)
    {
        res.json({message :"Authentication Failed"});
    }
}

const authAdmin= async(req, res, next)=>{
    try{
        const token = req.body.token;
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        if(decodedToken.isAdmin){
            next();
        }
        else{
            res.json({message :"Authentication Failed"});
        }
    }
    catch(err){
        res.json({message :"Authentication Failed", error: err});
    }
}

module.exports = {authUser, authAdmin};
