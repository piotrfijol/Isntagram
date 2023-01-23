const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const { body, validationResult } = require("express-validator");

const accountController = require("../../controllers/account");

router.post("/account/edit",
    body("biography")
    .isLength({max: 350})
    .withMessage("Biography can't be longer than 350 characters."),
    (req, res, next) => {
        const {errors} = validationResult(req);
        if(errors.length > 0) {
            return res.status(422).json({
                status: 422,
                message: errors[0].msg
            });
        }
        
        next();
    },  
    accountController.edit
);

router.post("/account/avatar", 
    upload.single("file"),
    accountController.setAvatar
);

module.exports = router;