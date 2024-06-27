const jwt = require("jsonwebtoken");
const {JWT_TOKEN} = require("./config");

function authMiddleware(req, res, next) {
    const authorization = req.headers.authorization;
    // Check if Authorization header exists and has expected format
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Wrongg!!" });
    }
    else {
        const token = authorization.split(' ')[1];
        // console.log(token)
        try {
            const tokenCheck = jwt.verify(token, JWT_TOKEN)
            // console.log(tokenCheck)
            req.userId = tokenCheck.userID //assigning for further use..
            next();
        } catch (error) {

            res.json({ message: error })
        }
    }
}

module.exports = { authMiddleware }