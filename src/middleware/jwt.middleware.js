import jwt from "jsonwebtoken"

const jwtAuth=(req,res,next)=>{
    const token = req.headers["authorization"];
    if(!token){
        return res.status(401).send("UnAuthorised")
    }
    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        req.userID=payload.userID;
    }
    catch(ex)
    {
        return res.status(401).send("Unauthorised")
    }
    next()
}

export default jwtAuth;