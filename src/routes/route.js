const express=require('express')
const router=express.Router()
const {createUser, loginUser, getUserProfile, updateProfile} = require("../controller/userController");
const mid = require("../middleware/auth");

//========================================= UserController =======================================================//

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/user/:userId/profile", mid.authenticate, getUserProfile);
router.put("/user/:userId/profile", mid.authenticate, mid.authorisation, updateProfile);


module.exports=router