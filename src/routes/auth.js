export const isLogged = () => {
    const user = localStorage.getItem('@palpiteiros:user')
    return user ? true : false
}

