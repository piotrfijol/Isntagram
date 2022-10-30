const userModel = require("../models/User");

const createUser = (req, res) => {
    const { username, password, email } = req.body;

    let user = new userModel({
        username,
        password,
        email
    });

    user.save()
        .then((data) => {
            res.send("Account has been created successfully!");
        })
        .catch((err) => {
            res.send("Error has occured!");
        });
};


module.exports = {
    createUser
}