const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const postRoutes = require("./post");
const userRoutes = require("./user");
const tagsRoutes = require("./tags");
const accountRoutes = require("./account");

router.use(authRoutes);
router.use(postRoutes);
router.use(userRoutes);
router.use(accountRoutes);
router.use(tagsRoutes);

module.exports = router;