const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const postRoutes = require("./post");
const userRoutes = require("./user");
const tagsRoutes = require("./tags");
const accountRoutes = require("./account");
const searchRoutes = require("./search");

router.use(authRoutes);
router.use(postRoutes);
router.use(userRoutes);
router.use(accountRoutes);
router.use(tagsRoutes);
router.use(searchRoutes);

module.exports = router;