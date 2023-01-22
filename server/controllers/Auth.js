const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

require("dotenv").config()

const createAccount = (req, res, next) => {
    const { username, password, email } = req.body;
    
    userModel.find({$or: [{username}, {email}]})
    .then(async (data) => {
        if(data.length) {
            return next(createError(409, "Username or email is already taken"));

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
                    status: 201,
                    message: "Account was created successfully",
                })
            })
            .catch((err) => {
                return next(500);
            });
        }
    });
};

const authenticateUser = (req, res, next) => {
    const { username, password } = req.body;

    userModel.findOne({ username })
    .then(async (user) => {
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

                const { _id, username, profile } = user;

                user.refreshToken = refreshToken;
                try {
                    await user.save();
                } catch(err) {
                    return next(createError(500, "Authentication problem occured. Try again later"));
                }

                res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.json({
                    _id,
                    username,
                    accessToken,
                    profile
                });

            } else {
                return next(createError(422, "Invalid credentials"));
        }
    })
};

const logOut = async (req, res, next) => {
    const accessToken = req.headers.authorization.split(' ')[1];

    const payload = jwt.decode(accessToken);

    const user = await userModel.find({_id: payload._id});
    if(user) {
        user.refreshToken = "";
        res.clearCookie("refreshToken");
        
        res.status(204).json({
            status: 204,
            message: "Succesfully logged out"
        });
    }

};

module.exports = {
    createAccount,
    authenticateUser,
    logOut
}