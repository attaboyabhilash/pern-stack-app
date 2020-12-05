const express = require("express")
const cors = require("cors")
const jwtAuth = require("./routes/jwtAuth")
const dashboard = require("./routes/dashboard")
const path = require("path")

const app = express()

//middlewares
app.use(cors())
app.use(express.json())

//Static File in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
}

//routes
app.use("/auth", jwtAuth)

//dashboard
app.use("/dashboard", dashboard)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})
