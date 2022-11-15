const userModel = require("../models/user");
const postModel = require("../models/post");
const followingModel = require("../models/following");
const followerModel = require("../models/follower");

const getUser = async (req, res) => {
    const {username} = req.params;

    const user = await userModel.findOne({username});
    if(!user) {
        return res.status(404).json({
            statusCode: 404,
            message: "User not found"
        });
    }

    Promise.all([
        postModel.find({user: user._id}, "-__v -_user -_updatedAt -imgURL._id"),
        followingModel.count({ from: user._id}),
        followerModel.count({ to: user._id })
    ]).then((dataArr) => {
        res.json({
            username: user.username,
            posts: dataArr[0],
            following: {
                count: dataArr[1]
            },
            followers: {
                count: dataArr[2]
            }
        });
    })
    

};

module.exports = {
    getUser
}