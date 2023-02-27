const jwt = require("jsonwebtoken");

const verifyToken = async(token) => {
    return jwt.decode(token,process.env.JWT_TOKEN,(error,decode) => {
        if(error) return false
        if(decode) return decode
    })
}

module.exports = verifyToken;