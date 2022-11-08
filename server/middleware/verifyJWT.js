const userModel = require("../models/user");
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
        const token = authorizationHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
            if(err) {
                return res.status(401).json({
                    statusCode: 403,
                    message: "Invalid token"
                })
            }

            const user = await userModel.findOne(
                    {_id: payload._id}, 
                    {_id: 1, username: 1, email: 1}
                );

            req.user = user;
            req.jwt = token;

            return next();
        });

    } catch(err) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        })
    }
        
}