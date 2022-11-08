const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../../middleware/verifyJWT");
const postController = require("../../controllers/post");
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

module.exports = router;