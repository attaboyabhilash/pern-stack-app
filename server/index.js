const express = require("express")
const cors = require("cors")
const jwtAuth = require("./routes/jwtAuth")
const dashboard = require("./routes/dashboard")
require("dotenv").config()

const app = express()

//middlewares
app.use(cors())
app.use(express.json())

//routes
app.use("/auth", jwtAuth)

//dashboard
app.use("/dashboard", dashboard)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
