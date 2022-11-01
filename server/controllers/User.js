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
                res.json({
                    statusCode: 500,
                    message: "Server internal error occurred while creating an account",
                });
            });
        }
    });
};

const authenticateUser = (req, res) => {
    const { username, password } = req.body;

    userModel.findOne({ username })
    .then(async (user) => {
        if(user !== null && bcrypt.compareSync(password, user.password)) {
            let token = await jwt.sign({
                _id: user._id,
                username: user.username,
                email: user.email
            }, process.env.JWT_SECRET)

            return res.json({token})
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