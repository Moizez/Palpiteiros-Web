import api_fetch from './api_fetch'

export default {

    saveScore: async (values) => {

        const data = {
            idConfrontation: values.id,
            golsVisiting: values.golsVisiting,
            golsHome: values.golsHome,
            redHomeCard: values.cardHomeRed,
            redVisitingCard: values.cardVisitingRed,
            yellowVisitingCard: values.cardVisitingYellow,
            yellowHomeCard: values.cardHomeYellow
        }
        const request = await api_fetch.post(`/scoreboards`, data)
        return request
    },

  
}