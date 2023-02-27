const express = require("express");
const userRouter = express.Router();
const auth = require("./../middlerware/auth")
const {
    userRegister,
    userLogin,
    userProfile
} = require("./../controller/userCtrl")

userRouter.post("/register",userRegister);

userRouter.post("/login",userLogin);

userRouter.get("/profile",auth,userProfile)

module.exports = userRouter