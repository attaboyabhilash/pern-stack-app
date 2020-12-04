import React, { useState, useEffect } from "react"
import { Button, Card, Input } from "antd"
import { MdClose } from "react-icons/md"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"

function EditTodo({ id }) {
    const { Meta } = Card
    const { Search } = Input
    const history = useHistory()
    const [todo, setTodo] = useState({})
    const [description, setDescription] = useState("")
    const [drop, setDrop] = useState(false)

    const getOneTodo = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/dashboard/todos/${id}`,
                {
                    method: "GET",
                    headers: { token: localStorage.token },
                }
            )
            const parseResponse = await response.json()
            setTodo(parseResponse)
        } catch (err) {
            console.error(err.message)
        }
    }

    const onEditText = async (value) => {
        if (value !== "") {
            try {
                const body = { description: value }
                await fetch(
                    `http://localhost:5000/dashboard/todos/${todo.todo_id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            token: localStorage.token,
                        },
                        body: JSON.stringify(body),
                    }
                )
                toast.success("Todo Edited Successfully!")
            } catch (err) {
                console.error(err.message)
            }
        }
    }

    useEffect(
        () => {
            getOneTodo()
        },
        // eslint-disable-next-line
        [todo]
    )

    return (
        <div className="edit-todo">
            <h1>Edit Todo Description</h1>
            <Card hoverable className="card-top">
                <MdClose
                    className="close"
                    onClick={() => history.push("/dashboard")}
                />
                <Meta title={todo.description} />
                <Button
                    type="primary"
                    className="edit-button"
                    onClick={() => {
                        setDrop((drop) => (drop = !drop))
                        setDescription(todo.description)
                    }}
                >
                    Click to Edit
                </Button>
            </Card>
            <Card
                className="card-bottom"
                hoverable
                style={
                    drop
                        ? { transform: "translateY(0px)" }
                        : { transform: "translateY(-140px)" }
                }
            >
                <div className="text-editor">
                    <Search
                        value={description}
                        allowClear
                        enterButton="Edit"
                        size="large"
                        onSearch={onEditText}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </Card>
        </div>
    )
}

export default EditTodo
