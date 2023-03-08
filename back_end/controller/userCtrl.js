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
    if(user) res.json(user[0])
    else res.status(500).json(user)
}

const toggleFollow = async(req,res) => {
    const authId = await res.locals.user._id;
    
    const targetId = req.params.id;
    
    const authUser = await db.collection("users").findOne({_id : new ObjectId(authId)});
    authUser.following = authUser.following || [];
    
    const targetUser = await db.collection("users").findOne({_id : new ObjectId(targetId)});
    targetUser.followers = targetUser.followers || []
    
    //const targetUserFollower = targetUser.followers.find(item => item.toString() === authId)
    

    if(targetUser.followers.find(item => item.toString () === authId)){
        targetUser.followers = targetUser.followers.filter( 
            uid =>  uid.toString() !== authId
        )

        authUser.following = authUser.following.filter(
            uid  => uid.toString() !== targetId
        )
    }else{
        targetUser.followers.push(new ObjectId(authId));
        authUser.following.push(new ObjectId(targetId))
    }

    try{
        await db.collection("users").updateOne(
            {_id : new ObjectId(authId)},
            {
                $set : {following : authUser.following}
            }
        );

        await db.collection("users").updateOne(
            {_id : new ObjectId(targetId)},
            {
                $set : {followers : targetUser.followers}
            }
        );

        return res.status(200).json({
            followers : targetUser.followers,
            following : authUser.following
        })

    }catch(e){
        return res.status(500).json({msg : e.message})
    }
    
}



module.exports = {
    userRegister,
    userLogin,
    verify,
    getUser,
    toggleFollow,
}