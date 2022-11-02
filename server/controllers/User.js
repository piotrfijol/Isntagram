const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const createUser = (req, res) => {
    const { username, password, email } = req.body;
    
    userModel.find({$or: [{username}, {email}]})
    .then(async (data) => {
        if(data.length) {
            return res.status(409).json({
                statusCode: 409,
                message: "Username or email is already taken",
            })
        } else {

            const hashedPassword = await bcrypt.hash(password, 12);

            let user = new userModel({
                username,
                password: hashedPassword,
                email
            });

            user.save()
            .then((data) => {
                res.status(201).json({
                    statusCode: 201,
                    message: "Account was created successfully",
                })
            })
            .catch((err) => {
                throw new Error("Server internal error occurred while creating an account");
            });
        }
    });
};

const authenticateUser = (req, res) => {
    const { username, password } = req.body;

    userModel.findOne({ username })
    .then((user) => {
        if(user !== null && bcrypt.compareSync(password, user.password)) {
            let accessToken = jwt.sign({
                    _id: user._id,
                }, 
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5min'});
            
            let refreshToken = jwt.sign({
                    _id: user._id,
                }, 
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d'});
            

            Promise.all([accessToken, refreshToken])
                .then(async ([accessToken, refreshToken]) => {
                    const { _id, username } = user;

                    user.refreshToken = refreshToken;
                    try {
                        await user.save();
                    } catch(err) {
                        throw new Error("Authentication problem occured. Try again later");
                    }

                    res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                    res.json({
                        _id,
                        username,
                        accessToken,
                    })
                }).catch((err) => {
                    throw new Error("Authentication problem occured. Try again later");
                });

            } else {
            return res.status(422).json({
                message: "Invalid credentials",
                statusCode: 422
            })
        }
    })
};

module.exports = {
    createUser,
    authenticateUser
}