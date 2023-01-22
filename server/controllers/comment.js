const commentModel = require("../models/comment");
const createError = require("http-errors");

const createComment = (req, res, next) => {
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
                status: 201,
                comment: {
                    content,
                    user,
                    post
                } 
            });

        }).catch((err) => {
            return next(createError(500));
        });
};

const getComments = (req, res, next) => {
    const { postId } = req.params;
    
    commentModel.find({ post: postId }, "user post content")
    .populate({path:"user", select:"username profile -_id"})
        .then((comments) => {
            return res.status(200).json({
                status: 200,
                comments
            })
        }) 
        .catch((err) => {
            return next(createError(500))
        });
};

module.exports = {
    createComment,
    getComments
};
