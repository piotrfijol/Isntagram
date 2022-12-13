const commentModel = require("../models/comment");

const createComment = (req, res) => {
    const { postId } = req.params;

    const comment = new commentModel({
        post: postId,
        user: req.user._id,
        content: req.body.data.content
    });

    comment.save()
        .then(async (document) => {
            const {content, post, user} = await document.populate({path: "user", select: "username -_id"});

            res.status(201).json({
                statusCode: 201,
                comment: {
                    content,
                    user,
                    post
                } 
            });

        }).catch((err) => {
            return res.status(500).json({
                statusCode: 500,
                message: "Server internal error"
            });
        });
};

const getComments = (req, res) => {
    const { postId } = req.params;
    
    commentModel.find({ post: postId }, "user post content")
    .populate({path:"user", select:"username profile -_id"})
        .then((comments) => {
            return res.status(200).json({
                statusCode: 200,
                comments
            })
        }) 
        .catch((err) => {
            res.status(500).json({
                statusCode: 500,
                message: "Server Internal error"
            })
        });
};

module.exports = {
    createComment,
    getComments
};
