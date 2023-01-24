const postModel = require("../models/post");
const userModel = require("../models/user");
const tagsModel = require("../models/tags");
const { uploadImage } = require("../utils/storage");
const createError = require("http-errors");


const createPost = async (req, res, next) => {
    const {description} = req.body;
    let tags = req.body.tags.split("#");
    let storageResponses;

    try {
        let storageRequests = [uploadImage(req.file, {width: 1280}), uploadImage(req.file, {width: 480})];
        storageResponses = await Promise.all(storageRequests);

    } catch(err) {
        console.log(err)
    }

    const post = new postModel();
    post.user = req.user._id;
    post.imgURL = {
        "1280": storageResponses[0].url,
        "480": storageResponses[1].url
    },
    post.description = description;
    post.tags = tags;

    const tagsPromises = [];

    tags.forEach((tag) => {
       tagsPromises.push(tagsModel.updateOne({name: tag}, {name: tag}, {upsert: true}));
    });

    const result = await Promise.all(tagsPromises);

    post.save((err, results) => {
        if(err) return next(createError(500, "Post didnt get saved. Try again"));
    
        res.status(201).json({
            status: 201,
            "message": "Post saved succesfully"
        });
    });

};

const getAnyPosts = async (req, res, next) => {
    const posts = await postModel.find({}, "-imgURL._id").sort({createdAt: -1});

    if(!posts.length) {
        return next(createError(404, "No posts available"));
    }

    return res.status(200).json({
        status: 200,
        posts
    });
};

const getPost = async (req, res) => {
    const {id} = req.params;

    try {
        const post = await postModel.findOne({_id: id}, "-_imgURL._id -__v -updatedAt").populate("user", "username profile -_id");
        res.status(200).json(post);

    } catch(err) {
        return next(createError(500));
    }
};

const getPosts = async (req, res) => {

    const PAGE_SIZE = 3;
    const page = req.query['p'];

    const posts = await postModel.aggregate([
        {
            $lookup:
                {
                    from: "followings",
                    localField: "user",
                    foreignField: "to",
                    as: "relationship"
                }
        },
        { "$match": { "relationship.from": req.user._id } }
    ]).sort({createdAt: -1}).skip(PAGE_SIZE * page).limit(PAGE_SIZE);

    const postsPopulated = await userModel.populate(posts, {path: "user", select: "username -_id"});

    return res.status(200).json({
        status: 200,
        posts: postsPopulated
    });
};

const updatePost = (req, res) => {

};

const removePost = (req, res) => {

};


module.exports = {
    createPost,
    getPosts,
    getAnyPosts,
    getPost,
    updatePost,
    removePost
}


