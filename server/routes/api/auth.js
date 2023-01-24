const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authController = require("../../controllers/auth");
const { verifyJWT } = require("../../middleware/verifyJWT");
const { useRefreshToken } = require("../../controllers/refreshToken")

router.post('/signin',
body("username")
  .exists()
  .matches(/^[A-Za-z0-9\.]+$/)
  .isLength({max: 30}),
body("password")
  .isLength({min: 8})
  .withMessage("Invalid credentials"),
  (req, res, next) => {
    let {errors} = validationResult(req);

    if(errors.length > 0) {
      return res.status(422).json({
        status: 422, 
        message: errors[0].msg
      });
    } else {
      next();
    }
  },
  authController.authenticateUser
);

router.post('/signup', 
body("username")
  .exists()
  .withMessage("Username is required")
  .matches(/^[A-Za-z0-9\.]+$/)
  .withMessage("Username can contain letters, digits and period characters only")
  .matches(/^[A-Za-z]/)
  .withMessage("Username must start with a letter")
  .matches(/^(?![A-Za-z0-9]*\.{2,})/)
  .withMessage("Username can't contain more than one period character in a row")
  .isLength({min: 6, max: 30})
  .withMessage("Username length must be between 6 and 30 characters"),
body("password")
  .exists()
  .withMessage("Password is required")
  .isLength({min: 8})
  .withMessage("Password should be at least 8 characters long")
  .isLength({max: 64})
  .matches(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .withMessage("Password must include at least: 1 uppercase, 1 lowercase letter and 1 digit")
  .custom(async (password, {req}) => {
    if(password === req.body.username) {
      throw new Error("Password can't be the same as username")
    } else if(password === req.body.email) {
      throw new Error("Password can't be the same as email address")
    }
  }),
body("repeatPassword")
  .exists()
  .withMessage("Repeat password field is required")
  .custom(async (repeatPassword, {req}) => {
    if(repeatPassword !== req.body.password) {
      throw new Error("Repeat password and password field must share the same value")
    }
  }),
body("email")
  .exists()
  .withMessage("Email address is required")
  .isEmail(),
  (req, res, next) => {
    
    let {errors} = validationResult(req);
  
    if(errors.length > 0) {
      return res.status(422).json({
        status: 422, 
        message: errors[0].msg
      });
    }

    next();
  },
  authController.createAccount
);

router.get("/refresh-token", 
  useRefreshToken
  );

router.post("/logout", 
  verifyJWT,
  authController.logOut
)

module.exports = router;
