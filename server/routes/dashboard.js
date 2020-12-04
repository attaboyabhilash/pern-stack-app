const express = require("express")
const pool = require("../db")
const authorization = require("../middlewares/authorization")

const router = express.Router()

//Dashboard + Get all Todos
router.get("/", authorization, async (req, res) => {
    try {
        const users = await pool.query(
            "SELECT users.user_name todos.todo_id, todos.description FROM users LEFT JOIN todos on users.user_id = todos.user_id WHERE users.user_id = $1",
            [req.user.id]
        )
        res.json(users.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

// Create a Todo
router.post("/todos", authorization, async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todos (user_id, description) VALUES($1, $2) RETURNING *",
            [req.user.id, description]
        )
        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// Get one Todo
router.get("/todos/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params
        const oneTodo = await pool.query(
            "SELECT * from todos WHERE todo_id = $1",
            [id]
        )
        res.json(oneTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// Update a Todo
router.put("/todos/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updateTodo = await pool.query(
            "UPDATE todos set description = $1 WHERE todo_id = $2",
            [description, id]
        )
        res.json("Todo was Updated!")
    } catch (err) {
        console.error(err.message)
    }
})

// Delete a Todo
router.delete("/todos/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query(
            "DELETE from todos WHERE todo_id = $1",
            [id]
        )
        res.json("Todo was Deleted!")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router
