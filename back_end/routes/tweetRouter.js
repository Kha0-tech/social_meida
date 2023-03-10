const express = require("express");
const auth = require("../middlerware/auth");
const tweetRouter = express.Router();
const {
    tweetPost,
    getTweets,
    deleteTweet,
    editTweet
} = require("./../controller/tweetCtrl")


tweetRouter.get("/",getTweets)

tweetRouter.post("/post",auth,tweetPost)

tweetRouter.delete("/:id",auth,deleteTweet)

tweetRouter.put("/:id",auth,editTweet)

module.exports = tweetRouter;