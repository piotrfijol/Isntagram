const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const postRoutes = require("./post");
const userRoutes = require("./user");

router.use(authRoutes);
router.use(postRoutes);
router.use(userRoutes);

module.exports = router;