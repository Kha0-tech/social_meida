const {MongoClient,ObjectId} = require("mongodb");

const mongo = new MongoClient(process.env.MONGO_URL);
const db = mongo.db("social_media")

const bcrypt = require("bcrypt");

const generateToken = require("./../utils/generateToken")

const userRegister = async(req,res) => {

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
            return res.json({msg : "User have not register"})
        }else{
            const hash = await bcrypt.compare(password,user.password)
            if(hash){
                const token=await generateToken(user)
                return res.send(token)
            }else{
                res.json({msg : "Password incorrect"})
            }
        }
    }catch(error){
        return res.send(error)
    }
   
    
}

const userProfile = async(req,res) => {
    const user =await res.locals.user
    if(!user) return res.json({msg : "token is missing"})
    res.json(user)
}




module.exports = {
    userRegister,
    userLogin,
    userProfile
}