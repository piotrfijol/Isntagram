const userModel = require("../models/user");
const postModel = require("../models/post");


const getUser = async (req, res) => {
    const {username} = req.params;

    const user = await userModel.findOne({username});
    if(!user) {
        return res.status(404).json({
            statusCode: 404,
            message: "User not found"
        });
    }

    const posts = await postModel.find({user: user._id}, "-__v -_user -_updatedAt");
    
    res.json({
        username: user.username,
        posts
    });

};

module.exports = {
    getUser
}