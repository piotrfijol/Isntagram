const userModel = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = (req, res) => {
    const { username, password, email } = req.body;

    userModel.find().where({username}).or({email}).exec()
    .then(async (data) => {
        if(data.length)
            return res.send("The username or email is already taken")
        else {

            const hashedPassword = await bcrypt.hash(password, 12);

            let user = new userModel({
                username,
                password: hashedPassword,
                email
            });

            user.save()
            .then((data) => {
                res.send("Account has been created successfully!");
            })
            .catch((err) => {
                res.send("Error has occured!");
            });
        }
    });
};


module.exports = {
    createUser
}