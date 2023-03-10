const {MongoClient,ObjectId} = require("mongodb");

const mongo = new MongoClient(process.env.MONGO_URL);
const db = mongo.db("social_media")


const tweetPost = async (req,res) => {
    const {body} = req.body;
    
    const authId =await res.locals.user._id;
    try{
    
        if(!body) return res.status(400).json({msg : "Need content"});
        if(authId){
            const tweet=await db.collection("tweets").insertOne({
                type : 'post',
                body,
                owner : new ObjectId(authId),
                created : new Date().toLocaleDateString(),
                linke  : [],

            })
            console.log("tweet post => ",tweet)
            res.status(200).json({tweet})
        }else {
            res.json({msg : "Please login and register"})
        }
    }catch(error){
        res.json(error)
    }
}

const getTweets = async(req,res) => {
    res.json({msg : "get tweet"})
}

const deleteTweet = async(req,res) => {
    const id = req.params.id;
    const authId =await res.locals.user._id;
    const ownerCheckTweet =await db.collection("tweets").findOne({owner : new ObjectId(authId)});

    if(id && ownerCheckTweet){
        await db.collection("tweets").deleteOne({_id : new ObjectId(id)});
        res.json({msg : "Delete post is success"})
    }else{
        res.status(500).json({msg : "Something is wrong delete tweet"})
    }
}

const editTweet = async(req,res) => {
    const authId =await res.locals.user._id;
    const ownerCheckTweet =await db.collection("tweets").findOne({owner : new ObjectId(authId)});
    const id = req.params.id
    const {body} = req.body;
    if(id && ownerCheckTweet){
        const tweet =await db.collection("tweets").updateOne(
            {_id : new ObjectId(id)},
            {
                $set : {body}
            }
        )
        res.json(tweet)
    }else{
        res.status(500).json({msg : "Something is wrong edit tweet"})
    }
}

module.exports = {
    tweetPost,
    getTweets,
    deleteTweet,
    editTweet
}
