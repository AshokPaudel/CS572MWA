const jwt = require("jsonwebtoken");
const util = require("util");
const sendResponse = require("./novel.controller").sendResponse;
const jwtVerifyPromise = util.promisify(jwt.verify,{context:jwt});


const authenticate= function(req,res,next){
    const response= {
        status:403,
        message:{message:"No token provided"}
    }
    const headerExists = req.headers.authorization;

    if(headerExists){
        console.log(req.headers)
        const token=req.headers.authorization.split(" ")[1];
        console.log("token  = ",token);
        jwtVerifyPromise(token,process.env.JWT_PASSWORD_PKEY)
            .then(()=>next())
            .catch((error)=>_invalidAuthorizationToken(error,res,response))
        // jwt.verify(token,process.env.JWT_PASSWORD_KEY)
    }else{
        response.status=403;
        response.message="No token provided";
        console.log("No token provided");
        sendResponse(res,response);
    
    }
}
const _invalidAuthorizationToken = function(error,res,response){
	console.log(error);
	response.status=401;
	response.message = "Unauthorized"
    console.log("Unauthorized Token");
	sendResponse(res,response);
}

module.exports = {
    authenticate
}