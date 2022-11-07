const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../../middleware/verifyJWT");
const postController = require("../../controllers/post");

router.use(verifyJWT);

router.post("/post",
    postController.createPost
);

router.get("/posts",
    postController.getPosts
);

router.put("/post/:id",
    postController.updatePost
);

router.delete("/post/:id",
    postController.removePost
);

module.exports = router;