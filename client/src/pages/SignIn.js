import React from "react"
import Header from "../components/Header"
import SignInForm from "../components/SignInForm"
import VectorOne from "../assets/Vector-One.svg"
import Footer from "../components/Footer"

const SignIn = ({ setAuthenticated }) => {
    document.title = "PERN Auth | SignIn"
    return (
        <>
            <div className="container">
                <Header />
                <div className="flexer">
                    <img src={VectorOne} alt="vector__" className="vector2" />
                    <SignInForm setAuthenticated={setAuthenticated} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SignIn
