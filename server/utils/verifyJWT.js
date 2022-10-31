const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyJWT = async (req, res, next) => {
    try {
        let result = await jwt.verify(req.headers['authorization'].split(' ')[1], process.env.JWT_SECRET);
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