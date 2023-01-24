const userModel = require("../models/user");
const postModel = require("../models/post");
const followingModel = require("../models/following");
const followerModel = require("../models/follower");
const createError = require("http-errors");

const getUser = async (req, res, next) => {
    const {username} = req.params;

    const user = await userModel.findOne({username});
    if(!user) {
        return next(createError(404, "User not found"));
    }

    Promise.all([
        postModel.find({user: user._id}, "-__v -_user -_updatedAt -imgURL._id").sort({createdAt: -1}),
        followingModel.count({ from: user._id}),
        followerModel.count({ to: user._id })
    ]).then((dataArr) => {
        res.json({
            username: user.username,
            profile: user.profile,
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