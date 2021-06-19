import api_fetch from './api_fetch'
import Cookies from 'js-cookie'

export default {

    onSignIn: async (email, password) => {
        const data = { email, password }
        console.log(email, password)
        const request = await api_fetch.post('/users/signin', data)
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