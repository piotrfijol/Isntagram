const express = require("express");
const router = express.Router();
const tagsController = require("../../controllers/tags");
const { verifyJWT } = require("../../middleware/verifyJWT");

router.use(verifyJWT);

router.get("/tags/:tag", tagsController.getPostsByTag);

module.exports = router;