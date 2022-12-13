const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const accountController = require("../../controllers/account");

router.post("/account/edit", 
    accountController.edit
);

router.post("/account/avatar", 
    upload.single("file"),
    accountController.setAvatar
);

module.exports = router;