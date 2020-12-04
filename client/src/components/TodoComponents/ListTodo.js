import React, { useState, useEffect } from "react"
import { Card } from "antd"
import { Link, useHistory } from "react-router-dom"
import { MdDeleteForever, MdEdit } from "react-icons/md"
import { toast } from "react-toastify"

function ListTodo() {
    const [todos, setTodos] = useState([])
    const [checked, setChecked] = useState(false)
    const history = useHistory()

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard", {
                method: "GET",
                headers: { token: localStorage.token },
            })
            const jsonData = await response.json()
            setTodos(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    }

    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
                method: "DELETE",
                headers: { token: localStorage.token },
            })
            toast.success("Todo Deleted Successfully!!")
            history.push("/dashboard")
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getTodos()
    }, [todos])

    return (
        <div className="list-todo">
            {todos.map((todo) => {
                return (
                    <Card key={todo.todo_id} hoverable>
                        <div className="list-flex-one">
                            <div className="list-flex-two">
                                <label className="check">
                                    <input
                                        type="checkbox"
                                        value={checked}
                                        onChange={() =>
                                            setChecked(
                                                (check) => (check = !check)
                                            )
                                        }
                                    />
                                    <span className="checkmark"></span>
                                    <p>{todo.description}</p>
                                </label>
                            </div>
                            <div className="icons">
                                <Link to={`/dashboard/${todo.todo_id}`}>
                                    <MdEdit className="edit" />
                                </Link>
                                <MdDeleteForever
                                    className="delete"
                                    onClick={() => deleteTodo(todo.todo_id)}
                                />
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export default ListTodo
