import React from "react"
import {
    FaHeart,
    FaLinkedinIn,
    FaTwitter,
    FaGithubSquare,
    FaInstagram,
} from "react-icons/fa"

function Footer() {
    return (
        <div className="footer">
            <h1>PERN</h1>
            <small>STACK</small>
            <p>
                Made with <FaHeart className="heart" /> by Abhilash Negi
            </p>
            <div className="icons">
                <a
                    className="twitter__"
                    target="blank"
                    href="https://twitter.com/attaboyabhilash"
                >
                    <FaTwitter className="twitter" />
                </a>
                <a
                    target="blank"
                    className="github__"
                    href="https://github.com/attaboyabhilash"
                >
                    <FaGithubSquare className="github" />
                </a>
                <a
                    target="blank"
                    className="linkedin__"
                    href="https://www.linkedin.com/in/abhilash-negi-247644180/"
                >
                    <FaLinkedinIn className="linkedin" />
                </a>
                <a
                    target="blank"
                    className="instagram__"
                    href="https://www.instagram.com/attaboyabhilash/"
                >
                    <FaInstagram className="instagram" />
                </a>
            </div>
        </div>
    )
}

export default Footer
