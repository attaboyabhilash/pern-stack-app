import React, { useState, useEffect } from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom"
import { Home, SignUp, SignIn, Dashboard, DashboardEdit } from "./pages"

const App = () => {
    const [isAuth, setIsAuth] = useState(false)

    const setAuthenticated = (boolean) => {
        setIsAuth(boolean)
    }

    const checkAuth = async () => {
        try {
            const response = await fetch("/auth/verify", {
                method: "GET",
                headers: { token: localStorage.token },
            })
            const parseResponse = await response.json()
            parseResponse === true ? setIsAuth(true) : setIsAuth(false)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        checkAuth()
    })

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {!isAuth ? (
                        <Home setAuthenticated={setAuthenticated} />
                    ) : (
                        <Redirect to="/dashboard" />
                    )}
                </Route>
                <Route exact path="/signup">
                    {!isAuth ? (
                        <SignUp setAuthenticated={setAuthenticated} />
                    ) : (
                        <Redirect to="/dashboard" />
                    )}
                </Route>
                <Route exact path="/signin">
                    {!isAuth ? (
                        <SignIn setAuthenticated={setAuthenticated} />
                    ) : (
                        <Redirect to="/dashboard" />
                    )}
                </Route>
                <Route exact path="/dashboard">
                    {isAuth ? (
                        <Dashboard setAuthenticated={setAuthenticated} />
                    ) : (
                        <Redirect to="/" />
                    )}
                </Route>
                <Route exact path="/dashboard/:id">
                    {isAuth ? (
                        <DashboardEdit setAuthenticated={setAuthenticated} />
                    ) : (
                        <Redirect to="/" />
                    )}
                </Route>
            </Switch>
        </Router>
    )
}

export default App
