const express = require("express");
const router = express.Router();
const {addUser,updateUser,viewAllUser} = require("../controllers/user.js");
const {verifyToken,isUser} = require('../middleware/token');

router.post("/user/add",verifyToken,isUser,addUser);
router.post("/user/update/:id",verifyToken,isUser,updateUser);
router.get("/user/view",verifyToken,isUser,viewAllUser);


module.exports = router;