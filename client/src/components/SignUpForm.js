import React from "react"
import { Form, Input, Button, Card, message } from "antd"
import { Link } from "react-router-dom"

function SignUpForm({ setAuthenticated }) {
    const onFinish = async (values) => {
        try {
            const response = await fetch("/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })
            const parseResponse = await response.json()
            if (parseResponse.token) {
                localStorage.setItem("token", parseResponse.token)
                setAuthenticated(true)
                message.success("Signed Up Successfully")
            } else {
                setAuthenticated(false)
                message.error(parseResponse)
            }
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <div className="signup">
            <Card>
                <h2>Sign Up</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                    size="large"
                    layout="vertical"
                >
                    <Form.Item
                        label="Username"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!",
                            },
                        ]}
                    >
                        <Input placeholder="johnnyboi" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Please input your Email Address!",
                            },
                        ]}
                    >
                        <Input placeholder="john@example.com" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="**********" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Sign Up
                        </Button>
                    </Form.Item>
                    <Form.Item style={{ textAlign: "center" }}>
                        <p>
                            Already a Member? <Link to="/signin">LogIn</Link>{" "}
                            Here.
                        </p>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default SignUpForm
