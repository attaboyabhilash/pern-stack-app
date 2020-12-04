import React from "react"
import { Form, Input, Button, Card } from "antd"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

function SignInForm({ setAuthenticated }) {
    const onFinish = async (values) => {
        try {
            const response = await fetch("http://localhost:5000/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })
            const parseResponse = await response.json()
            if (parseResponse.token) {
                localStorage.setItem("token", parseResponse.token)
                setAuthenticated(true)
                toast.success("Logged In Successfully")
            } else {
                setAuthenticated(false)
                toast.error(parseResponse)
            }
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <div className="signin">
            <Card>
                <h2>Sign In</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                    size="large"
                    layout="vertical"
                >
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
                            Sign In
                        </Button>
                    </Form.Item>
                    <Form.Item style={{ textAlign: "center" }}>
                        <p>
                            Not a Member? <Link to="/signup">SignUp</Link> Here.
                        </p>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default SignInForm
