const express = require("express")
const app = express();

require("dotenv").config();

const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))
const cors = require("cors")
app.use(cors())

const userRouter = require("./routes/userRouter");
const tweetRouter = require("./routes/tweetRouter");

app.use("/api/v1",userRouter)

app.use("/api/v1/tweets",tweetRouter)

app.listen(process.env.PORT,console.log("server is running 8000"))
