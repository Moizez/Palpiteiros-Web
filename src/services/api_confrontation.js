import api_fetch from './api_fetch'

export default {

    getAllConfrontation: async () => {
        const response = await api_fetch.get(`/confrontations`)
        return response
    },

    getAllConfrontationsClosed: async () => {
        const response = await api_fetch.get(`/confrontations/findManyByEnd`)
        return response
    },
    getConfrontationsToEndByChampionships: async (id) => {
        const response = await api_fetch.get(`/confrontations/findManyByLaterHourAndChampionshipContainsId/${id}`)
        return response
    },

    getGroupsByChampionshipId: async (id) => {
        const response = await api_fetch.get(`/groups/findManyByChampionshipContainsId/${id}`)
        return response
    },

    getFlagById: async (id) => {
        const response = await api_fetch.get(`/teams/findByShield/${id}`)
        return response
    },

    setSuspend: async (id) => {
        const request = await api_fetch.put(`/confrontations/setSuspended/${id}`, { suspended: true })
        return request
    },

    
}