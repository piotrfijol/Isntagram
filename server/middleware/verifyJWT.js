const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyJWT = async (req, res, next) => {
    try {
        let result = jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET);
        if(result) {
            return next();
        } 
    } catch(err) {
        return res.status(401).json({
            message: "Invalid token",
            statusCode: 401
        });
    }
        
}