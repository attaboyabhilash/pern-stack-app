import React, { useState, useEffect } from "react"
import { Avatar, Popover, Button, Tooltip, message } from "antd"
import { NavLink, Link, useLocation, useParams } from "react-router-dom"

function Header({ setAuthenticated }) {
    const location = useLocation()
    const { id } = useParams()
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false)

    const getName = async () => {
        try {
            const response = await fetch("/dashboard", {
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
        message.success("Logged Out Successfully")
    }

    useEffect(() => {
        getName()
    }, [])

    const handleVisibleChange = (visible) => {
        setVisible(visible)
    }

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
            <Popover
                content={content}
                trigger="click"
                visible={visible}
                onVisibleChange={handleVisibleChange}
            >
                <div style={{ float: "left" }}>
                    <Tooltip placement="left" title="Click to Logout">
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
                    </Tooltip>
                </div>
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
