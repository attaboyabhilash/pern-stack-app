import React, { useState } from "react"
import { Input } from "antd"
import { toast } from "react-toastify"

function InputTodo() {
    const { Search } = Input
    const [add, setAdd] = useState("")

    const handleSubmit = async (value) => {
        if (value !== "") {
            try {
                const body = { description: value }
                await fetch("http://localhost:5000/dashboard/todos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token,
                    },
                    body: JSON.stringify(body),
                })
                toast.success("Todo Added Successfully!")
                setAdd("")
            } catch (err) {
                console.error(err.message)
            }
        }
    }
    return (
        <div className="add-todo">
            <Search
                placeholder="Add a new Todo..."
                allowClear
                value={add}
                enterButton="Add Todo"
                size="large"
                onSearch={handleSubmit}
                onChange={(e) => setAdd(e.target.value)}
            />
        </div>
    )
}

export default InputTodo
