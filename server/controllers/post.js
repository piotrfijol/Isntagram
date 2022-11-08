const postModel = require("../models/post");
const userModel = require("../models/user");
const storage = require("../utils/storage");
const DataURIParser = require("datauri/parser");
const path = require("path");

const createPost = async (req, res) => {
    const {description, tags} = req.body;

    let storageResponse;
    try {
        const fileParser = new DataURIParser();
        const extName = path.extname(req.file.originalname).toString();
        const fileContent = fileParser.format(extName, req.file.buffer);

        storageResponse = await storage.uploader.upload(fileContent.content, {
            folder: "posts"
        });

    } catch(err) {
        console.log(err)
    }

    const post = new postModel();
    post.userId = req.user._id;
    post.imgURL = storageResponse.url,
    post.description = description;
    post.tags = [tags];

    post.save((err, results) => {
        if(err) throw new Error("Post didnt get saved. Try again");
    
        res.json({
            "message": "message"
        });
    });

};

const getAnyPosts = async (req, res) => {
    const posts = await postModel.find().limit(10);

    if(!posts.length) {
        res.status(404).json({
            statusCode: 404,
            message: "No posts available"
        });
    }

    return res.status(200).json({
        statusCode: 200,
        posts
    });
};

const getPost = (req, res) => {

};

const getPosts = (req, res) => {

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


