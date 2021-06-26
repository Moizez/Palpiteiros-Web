import api_fetch from './api_fetch'

export default {

    getRoundOf16: async (id) => {
        const response = await api_fetch.get(`/eliminatories/findOctaves/${id}`)
        return response
    },

    getAllQuarterfinals: async (id) => {
        const response = await api_fetch.get(`/eliminatories/findQuarterfinals/${id}`)
        return response
    },

    getAllSemis: async (id) => {
        const response = await api_fetch.get(`/eliminatories/findSemi/${id}`)
        return response
    },

    getAllFinals: async (id) => {
        const response = await api_fetch.get(`/eliminatories/findEnd/${id}`)
        return response
    },

    onGenerateRoundOf16: async (id) => {
        const response = await api_fetch.post(`/eliminatories/generateOctaves`, { id: id })
        return response
    },

    onGenerateQuarterfinals: async (id) => {
        const response = await api_fetch.post(`/eliminatories/generateQuarterfinals`, { id: id })
        return response
    },

    onGenerateSemi: async (id) => {
        const response = await api_fetch.post(`/eliminatories/generateSemi`, { id: id })
        return response
    },

    onGenerateFinals: async (id) => {
        const response = await api_fetch.post(`/eliminatories/generateEnd`, { id: id })
        return response
    },
}