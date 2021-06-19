import React, { useState, useEffect, createContext } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import api from '../services/api'

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const [loadingAuth, setLoadingAuth] = useState(false)
    const [user, setUser] = useState(null)
    const history = useHistory()

    useEffect(() => {
        const loadStorage = () => {
            const storageUser = Cookies.get('@palpiteiros:user')
            if (storageUser) {
                setUser(JSON.parse(storageUser))
            }
        }
        loadStorage()
    }, [])

    const handleSignIn = async (email, password) => {
        setLoadingAuth(true)

        const response = await api.onSignIn(email, password)

        if (response.data) {
            setUser(response.data)
            storageUser(response.data)
            setLoadingAuth(false)
            history.push('/home')
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

    const storageUser = (data) => {
        Cookies.set('@palpiteiros:user', data, { expires: 999 })
    }

    const handleLogout = () => {
        Cookies.remove('@palpiteiros:user')
        window.location.href = '/'
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user, user, loadingAuth,
            handleSignIn, handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
