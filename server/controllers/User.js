const userModel = require("../models/User");

const createUser = (req, res) => {
    const { username, password, email } = req.body;

    console.log("New password arrived\n========================")
    console.log("pwd= " + req.body.password)
    console.log("pwdLen= " + req.body.password.length);
    res.send("Registered!");


    /*
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
    */
};


module.exports = {
    createUser
}