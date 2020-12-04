const express = require("express")
const bcrypt = require("bcrypt")
const pool = require("../db")
const jwtGenerator = require("../utils/jwtGenerator")
const userInfoValidator = require("../middlewares/userInfoValidator")
const authorization = require("../middlewares/authorization")

const router = express.Router()

//Register
router.post("/signup", userInfoValidator, async (req, res) => {
    try {
        const { name, email, password } = req.body
        let user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1",
            [email]
        )

        if (user.rows.length !== 0) {
            return res.status(401).json("User already exist.")
        }

        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password, salt)

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        )

        const token = jwtGenerator(newUser.rows[0].user_id)
        res.json({ token })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

//LogIn
router.post("/signin", userInfoValidator, async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1",
            [email]
        )
        if (user.rows.length === 0) {
            return res.status(401).json("Email Id Incorrect")
        }
        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].user_password
        )

        if (!validPassword) {
            return res.status(401).json("Password is Incorrect")
        }

        const token = jwtGenerator(user.rows[0].user_id)
        res.json({ token })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

//Protected Route
router.get("/verify", authorization, (req, res) => {
    try {
        res.json(true)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router
