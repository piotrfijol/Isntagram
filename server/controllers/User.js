const userModel = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = (req, res) => {
    const { username, password, email } = req.body;

    userModel.find().where({username}).or({email}).exec()
    .then(async (data) => {
        if(data.length)
            return res.status(409).json({
                statusCode: 409,
                message: "Username or email is already taken",
            })
        else {

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


module.exports = {
    createUser
}