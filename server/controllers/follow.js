const followerModel = require("../models/follower");
const followingModel = require("../models/following");
const userModel = require("../models/user");
const createError = require("http-errors");

const getFollowing = async (req, res, next) => {
    
    const user = await userModel.findOne({username: req.params.username});

    followingModel.find({from: user._id})
        .then((data) => {
            res.status(200).json({
                status: 200,
                following: data
            })
        })
        .catch((err) => {
            return next(createError(500, "Couldn't get data about user's follows"))
        });

};

const getFollowers = async (req, res, next) => {
    const user = await userModel.findOne({username: req.params.username});

    followerModel.find({to: user._id})
        .then((data) => {
            res.status(200).json({
                status: 200,
                followers: data
            })
        })
        .catch((err) => {
            return next(createError(500, "Couldn't get data about user's followers"))
        });

};

const getIsFollowing = async (req, res, next) => {
    const {username: requestedUser} = req.params;

    if(req.user.username === requestedUser) {
        return res.json({});
    }

    try {
        const user = await userModel.findOne({username: requestedUser});
        const isFollowing = (await followingModel.findOne({
            from: req.user._id,
            to: user._id
        })) !== null;
    
        return res.status(200).json({
            isFollowing
        });

    } catch(err) {
        return next(createError(500));
    }
 };

const setFollow = async (req, res, next) => {
    if(req.user.username === req.params.username) {
        return next(createError(400, "You can't follow your own profile"));
    }

    const user = await userModel.findOne({username: req.params.username});
    
    const followData = {
        from: req.user._id,
        to: user._id
    };

    const isAlreadyFollowed = await followerModel.findOne(followData);
    if(isAlreadyFollowed) {
        return next(createError(500))
    }

    try {
        await followerModel.create(followData);
        await followingModel.create(followData);
    } catch(err) {
        return next(createError(500))
    }

    return res.status(201).json({
        status: 201,
        message: "User followed"
    });
};

const removeFollow = async (req, res) => {
    if(req.user.username === req.params.username) {
        return next(createError(400, "You can't unfollow your own profile"))
    }

    const user = await userModel.findOne({username: req.params.username});
    
    const followData = {
        from: req.user._id,
        to: user._id
    };

    try {
        await followerModel.deleteOne(followData);
        await followingModel.deleteOne(followData);
    } catch(err) {
        res.status(500).json({

        })
    }
    return res.status(204).send();
};


module.exports = {
    getFollowers,
    getFollowing,
    getIsFollowing,
    setFollow,
    removeFollow
}