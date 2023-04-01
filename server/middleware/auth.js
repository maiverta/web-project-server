const jwt = require("jsonwebtoken");
const config = require("../config");


const verifyToken = (req, res, next) => {
    const authHeader = req.body.token || req.query.token || req.headers["authorization"];
    if(!authHeader){
        return res.status(403).send("Token is required");
    }
    try{
        const decodedToken = jwt.verify(authHeader, config.jwtSecret)
        req.user = decodedToken;
    } catch(err){
        return res.status(401).send("Invalid token");
    }

    return next();
}

module.exports = verifyToken