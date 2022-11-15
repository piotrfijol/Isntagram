const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../../middleware/verifyJWT");
const postController = require("../../controllers/post");
const likeController = require("../../controllers/like");
const multer = require("multer");
const upload = multer();

router.use(verifyJWT);

router.post("/post",
    upload.single("file"),
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

module.exports = router;