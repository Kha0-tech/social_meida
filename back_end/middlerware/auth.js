const verifyToken = require('./../utils/verifyToken')

const auth = async (req,res,next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) return res.json({msg : "token is missing"})
    const user=verifyToken(token)
    res.locals.user = user
    next()
}

module.exports = auth;