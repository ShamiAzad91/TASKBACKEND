const express = require("express");
const router = express.Router();
const {addAdmin,updateAdmin,viewAllAdmin} = require("../controllers/admin.js");
const {verifyToken,isAdmin} = require('../middleware/token');

router.post("/admin/add",verifyToken,isAdmin,addAdmin);
router.post("/admin/update/:id",verifyToken,isAdmin,updateAdmin);
router.get("/admin/view",verifyToken,isAdmin,viewAllAdmin);




module.exports = router;