import React, { useState, useEffect } from "react"
import { Avatar, Popover, Button } from "antd"
import { NavLink, Link, useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

function Header({ setAuthenticated }) {
    const location = useLocation()
    const { id } = useParams()
    const [name, setName] = useState("")

    const getName = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard", {
                method: "GET",
                headers: { token: localStorage.token },
            })
            const parseData = await response.json()
            setName(parseData[0].user_name)
        } catch (err) {
            console.error(err.message)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setAuthenticated(false)
        toast.success("Logged Out Successfully")
    }

    useEffect(() => {
        getName()
    }, [])

    const content = () => {
        return (
            <Button
                type="primary"
                size="large"
                danger
                className="logout"
                onClick={() => logout()}
            >
                Logout
            </Button>
        )
    }

    return location.pathname === "/dashboard" ||
        location.pathname === `/dashboard/${id}` ? (
        <div className="head">
            <div></div>
            <Popover content={content}>
                <Avatar
                    size="large"
                    style={{
                        color: "#FFF",
                        backgroundColor: "#1890FF",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    {name.charAt(0).toUpperCase()}
                </Avatar>
            </Popover>
        </div>
    ) : (
        <div className="head">
            <Link to="/">
                <h1>PERN</h1>
            </Link>
            <div className="links">
                <NavLink to="/signin">SignIn</NavLink>
                <NavLink to="/signup">SignUp</NavLink>
            </div>
        </div>
    )
}

export default Header
