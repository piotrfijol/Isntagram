const likeModel = require("../models/like");

const like = async (req, res) => {
    const {id: postId} = req.params;

    let like = await likeModel.findOne({user: req.user._id, post: postId})
    if(like) {
        like.remove();
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

    let like = await likeModel.findOne({user: req.user._id, post: postId})
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