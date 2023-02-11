const express = require("express");
const router = express.Router();
const {signup,signin} = require("../controllers/auth.js");
const { body, validationResult } = require('express-validator');



router.post("/signup",[
  body('email').isEmail().withMessage('email must be unique'),
  body('password').isLength({ min: 6, max:12 }).withMessage('password must be atleast 6 character and less than 12 char'),
  body('first_name').isLength({min:3}).withMessage('first_name must be atleast 3 char'),
  body('last_name').isLength({min:3}).withMessage('last_name must be atleast 3 char'),
],signup);
router.post("/signin",[
    body('email').isEmail().withMessage('email must be unique'),
    body('password').isLength({ min: 6, max:12 }).withMessage('password must be atleast 6 character and less than 12 char')
  ],signin);


module.exports = router;