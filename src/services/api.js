import api_fetch from './api_fetch'

export default {

    onSignIn: async (email, password) => {
        const data = { email, password }
        const request = await api_fetch.post('/users/signin', data)
        return request
    },

    onCheckToken: async (token) => {
        const response = await api_fetch.get(`/users/checkLink/${token}`)
        return response
    },

    onRecoverPassword: async (id, password) => {
        const request = await api_fetch.put(`/users/${id}`, { password: password })
        return request
    },

    /* 
    onGetUserById: async () => {
        //const user = await JSON.parse(await AsyncStorage.getItem('@palpiteiros:user')) || []
        const response = await api_fetch.get(`/users/${user.id}`)
        return response
    },

    onUpdateUser: async (values) => {
        //const user = await JSON.parse(await AsyncStorage.getItem('@palpiteiros:user')) || []

        const data = {
            name: values.name,
            phone: values.phone,
            email: values.email,
            password: values.password
        }
        const request = await api_fetch.put(`/users/${user.id}`, data)
        return request
    },

    */

}