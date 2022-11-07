const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const postRoutes = require("./post");

router.use(authRoutes);
router.use(postRoutes);

module.exports = router;