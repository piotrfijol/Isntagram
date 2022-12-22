const postModel = require("../models/post");
const userModel = require("../models/user");
const { uploadImage } = require("../utils/storage");


const createPost = async (req, res) => {
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

    post.save((err, results) => {
        if(err) throw new Error("Post didnt get saved. Try again");
    
        res.json({
            "message": "message"
        });
    });

};

const getAnyPosts = async (req, res) => {
    const posts = await postModel.find({}, "-imgURL._id").sort({createdAt: -1});

    if(!posts.length) {
        return res.status(404).json({
            statusCode: 404,
            message: "No posts available"
        });
    }

    return res.status(200).json({
        statusCode: 200,
        posts
    });
};

const getPost = async (req, res) => {
    const {id} = req.params;

    try {
        const post = await postModel.findOne({_id: id}, "-_imgURL._id -__v -updatedAt").populate("user", "username profile -_id");
        res.status(200).json(post);

    } catch(err) {
        res.status(500).json({
            statusCode: 500
        })
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
        statusCode: 200,
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


