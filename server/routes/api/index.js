const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const postRoutes = require("./post");
const userRoutes = require("./user");
const accountRoutes = require("./account");

router.use(authRoutes);
router.use(postRoutes);
router.use(userRoutes);
router.use(accountRoutes);

module.exports = router;