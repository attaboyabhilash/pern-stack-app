import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Homepage from "../components/Homepage"

const Home = () => {
    document.title = "PERN Auth | Home"
    return (
        <>
            <div className="container">
                <Header />
                <Homepage />
            </div>
            <Footer />
        </>
    )
}

export default Home
