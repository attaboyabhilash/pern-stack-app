const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
    try {
        const jwtToken = req.header("token")
        if (!jwtToken) {
            return res.status(403).json("Not Authorized")
        }
        const payload = jwt.verify(jwtToken, process.env.SECRET)
        req.user = payload.user
        next()
    } catch (err) {
        console.error(err.message)
        res.status(403).send("Not Authorized")
    }
}
