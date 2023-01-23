const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../../middleware/verifyJWT");
const postController = require("../../controllers/post");
const likeController = require("../../controllers/like");
const commentController = require("../../controllers/comment");
const multer = require("multer");
const upload = multer();
const {body, validationResult} = require("express-validator");
const path = require("path");

router.use(verifyJWT);

router.post("/post",
    upload.single("file"),
    body("file")
    .isEmpty()
    .withMessage("Image file is required")
    .custom((value, {req}) => {
        if(req.file.mimetype === "image/jpeg")
            return true;
        else
            return false;
    }).withMessage("File must be of type .jpeg"),
    ((req, res, next) => {
        const {errors} = validationResult(req);
        if(errors.length > 0) {
            return res.status(422).json({
                status: 422,
                message: errors[0].msg
            })
        }
        next();
    }),
    postController.createPost
);

router.get("/posts/explore",
    postController.getAnyPosts
)

router.get("/posts",
    postController.getPosts
);

router.get("/post/:id",
    postController.getPost
);

router.put("/post/:id",
    postController.updatePost
);

router.delete("/post/:id",
    postController.removePost
);

router.put("/post/:id/like",
    likeController.like
);

router.delete("/post/:id/like",
    likeController.unlike
);

router.get("/post/:id/like",
    likeController.isLiked
);

router.get("/post/:id/likes",
    likeController.getLikes
);

router.get("/post/:postId/comments",
    commentController.getComments
);

router.post("/post/:postId/comment",
    commentController.createComment
);

module.exports = router;