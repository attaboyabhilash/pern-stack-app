import React from "react"
import DashboardComponent from "../components/DashboardComponent"
import Footer from "../components/Footer"

const DashboardEdit = ({ setAuthenticated }) => {
    document.title = "PERN Auth | Dashboard"
    return (
        <>
            <DashboardComponent setAuthenticated={setAuthenticated} />
            <Footer />
        </>
    )
}

export default DashboardEdit
