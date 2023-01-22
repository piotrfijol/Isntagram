const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();

exports.useRefreshToken = async (req, res, next) => {
    const {refreshToken} = req.cookies;
    
    const user = await userModel.findOne({refreshToken});
    
    if(!user) return res.status(403).json({status: 403, message: "Forbidden"});
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
        (err, decodedData) => {
            if(err || decodedData._id !== user._id.toString()) {
                return next(createError(403, "Forbidden"));
            }

            const token = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5min'});
            res.json({
                username: user.username,
                accessToken: token,
                profile: user.profile
            })
        })

};

