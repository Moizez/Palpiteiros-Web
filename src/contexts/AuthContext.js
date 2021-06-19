import React, { useState, useEffect, createContext } from 'react'

import api from '../services/api'
import history from '../routes/history'

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const [loadingAuth, setLoadingAuth] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        (() => {
            const storageUser = localStorage.getItem('@palpiteiros:user')
            if (storageUser) {
                setUser(JSON.parse(storageUser))
            }
        })()
    }, [])

    const handleSignIn = async (email, password) => {
        setLoadingAuth(true)

        const response = await api.onSignIn(email, password)

        if (response.data) {
            setUser(response.data)
            localStorage.setItem('@palpiteiros:user', JSON.stringify(response.data))
            setLoadingAuth(false)
            history.push('/')
            return
        } else if (response.status === 404) {
            setLoadingAuth(false)
            alert('E-mail ou senha inválidos!')
            return
        } else {
            setLoadingAuth(false)
            alert(`Falha inesperada! Erro: ${response.status}`)
            return
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('@palpiteiros:user')
        history.push('/sign-in')
    }

    return (
        <AuthContext.Provider value={{
            user, loadingAuth,
            handleSignIn, handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
