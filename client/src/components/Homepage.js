import React from "react"
import { Button } from "antd"
import { Link } from "react-router-dom"
import VectorOne from "../assets/Vector-One.svg"

function Homepage() {
    return (
        <div className="hero-section">
            <div className="hero-text">
                <h1>The best Todo-List on the Internet</h1>
                <p>This is a PERN Stack Application</p>
                <Link to="/signup">
                    <Button type="primary" size="large">
                        SignUp Here
                    </Button>
                </Link>
            </div>
            <div className="hero-image">
                <img src={VectorOne} alt="vector__" />
            </div>
        </div>
    )
}

export default Homepage
