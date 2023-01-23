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
    body("file")
    .isEmpty()
    .withMessage("Image file is required")
    .custom((value, {req}) => {
        if(req.file.mimetype === "image/jpeg")
            return true;
        else
            return false;
    }).withMessage("File must be of type .jpeg"),
    ((req, res, next) => {
        const {errors} = validationResult(req);
        if(errors.length > 0) {
            return res.status(422).json({
                status: 422,
                message: errors[0].msg
            })
        }
        next();
    }),
    accountController.setAvatar
);

module.exports = router;