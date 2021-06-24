import api_fetch from './api_fetch'

export default {

    getGroupsByChampionshipId: async (id) => {
        const response = await api_fetch.get(`/groups/findManyByChampionshipContainsId/${id}`)
        return response
    },
    
}