const express = require("express");
const userRouter = express.Router();
const auth = require("./../middlerware/auth")

const {
    userRegister,
    userLogin,
    verify,
    getUser,
    toggleFollow
} = require("./../controller/userCtrl");

userRouter.post("/register",userRegister);

userRouter.post("/login",userLogin);

userRouter.get("/users/verify",auth,verify);

userRouter.get("/users/:handle",getUser);

userRouter.put("/users/:id/follow",auth,toggleFollow);

module.exports = userRouter