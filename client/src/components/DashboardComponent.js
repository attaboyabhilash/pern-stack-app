import React, { useState, useEffect } from "react"
import { Layout, Menu, Empty } from "antd"
import { useParams } from "react-router-dom"
import Header from "../components/Header"
import { EditTodo, InputTodo, ListTodo } from "./TodoComponents"

function DashboardComponent({ setAuthenticated }) {
    const [name, setName] = useState("")
    const { Content, Sider } = Layout
    const { id } = useParams()

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

    useEffect(() => {
        getName()
    }, [])

    return (
        <div className="dashboard">
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    collapsible="true"
                    width={window.innerWidth > 600 ? "400px" : "100%"}
                    style={{
                        overflow: "auto",
                        height: "100vh",
                        padding: "20px 15px",
                        left: 0,
                        position: "relative",
                        zIndex: 10,
                    }}
                >
                    <div className="logo-text">
                        <h2>{`Welcome ${
                            name.charAt(0).toUpperCase() + name.slice(1)
                        }`}</h2>
                    </div>
                    <Menu theme="dark" mode="inline">
                        <InputTodo />
                        <ListTodo />
                    </Menu>
                </Sider>
                <Layout>
                    <div className="dash-head">
                        <Header setAuthenticated={setAuthenticated} />
                    </div>
                    <Content
                        style={{
                            margin: "0px",
                            overflow: "initial",
                            padding: "25px",
                            height: "100px",
                        }}
                    >
                        {id ? (
                            <EditTodo id={id} />
                        ) : (
                            <Empty
                                description="No Todo Selected"
                                style={{ marginTop: "150px", color: "#AAA" }}
                            />
                        )}
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default DashboardComponent
