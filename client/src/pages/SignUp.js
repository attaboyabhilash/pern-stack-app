import React from "react"
import Header from "../components/Header"
import SignUpForm from "../components/SignUpForm"
import VectorOne from "../assets/Vector-One.svg"
import Footer from "../components/Footer"

const SignUp = ({ setAuthenticated }) => {
    document.title = "PERN Auth | SignUp"
    return (
        <>
            <div className="container">
                <Header />
                <div className="flexer">
                    <img src={VectorOne} alt="vector__" className="vector" />
                    <SignUpForm setAuthenticated={setAuthenticated} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SignUp
