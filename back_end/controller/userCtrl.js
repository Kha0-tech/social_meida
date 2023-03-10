const {MongoClient,ObjectId} = require("mongodb");

const mongo = new MongoClient(process.env.MONGO_URL);
const db = mongo.db("social_media")

const bcrypt = require("bcrypt");

const generateToken = require("./../utils/generateToken")

const userRegister = async(req,res) => {
    const randomNumber = Math.floor(Math.random() * 18)
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({msg : "Require user info"})
    }

    if(name && email && password){
        const checkUser = await db.collection("users").findOne({email})
        if(checkUser) return res.status(200).json({msg : "user already have exists"})
        
        const hash =await bcrypt.hash(password,10)
        const user =await db.collection('users').insertOne({
            name ,
            email,
            handle : name + randomNumber,
            password : hash
        })
        if(user.insertedId){
            await db.collection("users").findOne({_id :new ObjectId(user.insertedId)})
            res.status(201).json({msg : "Create user account success"})
        }
        
    }
    

}

const userLogin = async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({msg : "Require credentials"})
    }
    try{
        const user =await db.collection("users").findOne({email})
        if(!user){
            return res.status(400).json({msg : "User have not register"})
        }
        const hash = await bcrypt.compare(password,user.password)
        if(hash){
            const token=await generateToken(user)
            return res.send(token)
        }else{
            res.status(400).json({msg : "Password incorrect"})
        }
        
    }catch(error){
        return res.send(error)
    }
   
    
}

const verify = async(req,res) => {
    res.json(res.locals.user)
}

const getUser = async(req,res) => {
    const {handle} = req.params;
    
    if(!handle) return res.status(400).json({msg : "user not found"})

    const user = await db.collection("users").aggregate([
        {
            $match : {handle}
        },
        {
            $lookup: {
                from: "users",
                localField: "followers",
                foreignField: "_id",
                as: "followers_users",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "following",
                foreignField: "_id",
                as: "following_users",
            },
        },
    ]).toArray()
    console.log("getUser =>",getUser)
    if(user) res.json(user[0])
    else res.status(500).json(user)
}

const follow = async(req,res) => {
    try{
        const authId = await res.locals.user._id;
    
        const targetId = req.params.id;
        
        const authUser = await db.collection("users").findOne({_id : new ObjectId(authId)});
        authUser.following = authUser.following || [];
        
        const targetUser = await db.collection("users").findOne({_id : new ObjectId(targetId)});
        targetUser.followers = targetUser.followers || []

        if(authUser && targetUser){

            const isAlreadyFollow = targetUser.followers.find(id => id.toString() === authUser._id.toString());
            
            if(isAlreadyFollow){
                authUser.following = authUser.following.filter(id => id.toString() !== targetUser._id.toString());
                targetUser.followers = targetUser.followers.filter(id => id.toString() !== authUser._id.toString());

                await db.collection("users").updateOne(
                    {_id : new ObjectId(authId)},
                    {$set : {following : authUser.following}}
                )

                await db.collection("users").updateOne(
                    {_id : new ObjectId(targetId)},
                    {$set : {followers : targetUser.followers}}
                )
                res.status(200).json({
                    following : authUser.following,
                    followers : targetUser.followers
                })

            }else if(!isAlreadyFollow) {
                
                authUser.following.push(targetUser._id);
                targetUser.followers.push(authUser._id);
                
                await db.collection("users").updateOne(
                    {_id : new ObjectId(authId)},
                    {
                        $set : {following : authUser.following}
                    }
                )

                await db.collection("users").updateOne(
                    {_id : new ObjectId(targetId)},
                    {$set : {followers : targetUser.followers}}
                )
                res.status(200).json({
                    following  : authUser.following,
                    followers  : targetUser.followers
                })
            }else{
                res.json({msg : "Somthing is wrong !"})
            }
        }else{
            res.status(400).json({msg :"Bad request follow"})
        }
    }catch(error){
        res.json(error.message)
    }    
}




module.exports = {
    userRegister,
    userLogin,
    verify,
    getUser,
    follow,
    // unfollow
}