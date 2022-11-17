const likeModel = require("../models/like");
const postModel = require("../models/post");

const like = async (req, res) => {
    const {id: postId} = req.params;

    let [like, post] = await Promise.all([
        likeModel.findOne({user: req.user._id, post: postId}),
        postModel.updateOne({_id: postId}, {$inc: {likesCount: 1}})
    ]);

    if(like) {
        return res.json({
            // post already liked
        }); 
    }

    like = new likeModel();
    like.user = req.user._id;
    like.post = postId;
    like.save().then((response) => {
        res.json({
            // successfully liked
        })
    }).catch((err) => {{
            // unsuccesfully liked
    }})
};

const unlike = async (req, res) => {
    const {id: postId} = req.params;

    let [like, post] = await Promise.all([
        likeModel.findOne({user: req.user._id, post: postId}),
        postModel.updateOne({_id: postId}, {$inc: {likesCount: -1}})
    ]);

    if(like) {
        like.remove();
        return res.json({
            // post unliked
        }); 
    }

    res.json({
        // post wasnt liked 
    });

};

const getLikes = (req, res) => {
    const {id: postId} = req.params;
    
    const likes = likeModel.find({post: postId});

    res.status(200).json({
        likes
    })
};

const isLiked = async (req, res) => {
    const {id: postId} = req.params;
    
    try {
        const like = await likeModel.findOne({post: postId, user: req.user._id});
        
        res.status(200).json({
            isLiked: like !== null
        })
    } catch(err) {
        res.status(500).json({
            statusCode: 500,
            message: "Server internal error"
        });
    }
};

module.exports = {
    like,
    unlike,
    getLikes,
    isLiked
}