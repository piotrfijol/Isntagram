const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyJWT = async (req, res, next) => {
    try {
        const {authorization: authorizationHeader} = req.headers;
        if(!authorizationHeader) {
            return res.status(401).json({
                message: "Unauthorized",
                statusCode: 401
            });
        }

        let result = jwt.verify(authorizationHeader.split(' ')[1], process.env.ACCESS_TOKEN_SECRET);
        if(result) {
            return next();
        } 
    } catch(err) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        })
    }
        
}