const jwt=require("jsonwebtoken");

const generateToken = async(user) => {
    return jwt.sign(user,process.env.JWT_TOKEN,{expiresIn : "1d"})
}
module.exports = generateToken;