import api_fetch from './api_fetch'

export default {

    saveScore: async (values, id) => {

        const data = {
            idConfrontation: id,
            golsVisiting: values.away,
            golsHome: values.home,
            redHomeCard: values.homered,
            redVisitingCard: values.awayred,
            yellowVisitingCard: values.awayyellow,
            yellowHomeCard: values.homeyellow
        }

        const request = await api_fetch.post(`/scoreboards`, data)
        return request
    },

    updateScore: async (values, id) => {

        const data = {
            golsVisiting: values.away,
            golsHome: values.home,
            redHomeCard: values.homered,
            redVisitingCard: values.awayred,
            yellowVisitingCard: values.awayyellow,
            yellowHomeCard: values.homeyellow
        }

        const request = await api_fetch.put(`/scoreboards/${id}`, data)
        return request
    },

    savePenaltyScore: async (values, id) => {

        const data = {
            idConfrontation: id,
            golsVisiting: values.away,
            golsHome: values.home,
            redHomeCard: values.homered,
            redVisitingCard: values.awayred,
            yellowVisitingCard: values.awayyellow,
            yellowHomeCard: values.homeyellow,
            penalty: {
                golsHome: values.homepenalty,
                golsVisiting: values.awaypenalty,
                isPenalty: true
            }
        }
        const request = await api_fetch.post(`/scoreboards`, data)
        return request
    },

    updatePenaltyScore: async (values, id) => {

        const data = {
            golsVisiting: values.away,
            golsHome: values.home,
            redHomeCard: values.homered,
            redVisitingCard: values.awayred,
            yellowVisitingCard: values.awayyellow,
            yellowHomeCard: values.homeyellow,
            penalty: {
                golsHome: values.homepenalty,
                golsVisiting: values.awaypenalty,
                isPenalty: true
            }
        }
        const request = await api_fetch.put(`/scoreboards/${id}`, data)
        return request
    },


}