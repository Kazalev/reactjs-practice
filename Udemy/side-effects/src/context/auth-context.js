import React, { useState, useEffect } from "react"

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password) => { }
})

export const AuthContextProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const isLoggedInLS = localStorage.getItem('isLoggedIn')
        if (isLoggedInLS === '1') setIsLoggedIn(true)
    }, [])

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1')
        setIsLoggedIn(true)
    }

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false)
    }

    return <AuthContext.Provider value={{ isLoggedIn, onLogin: loginHandler, onLogout: logoutHandler }}>{props.children}</AuthContext.Provider>
}

export default AuthContext