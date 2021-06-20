import React, { useState, useEffect } from 'react'
import FlatList from 'flatlist-react'

import api from '../../../../services/api_confrontation'

import MatchList from '../../../../components/Lists/MatchList'

const Matches = ({ id }) => {

    const [confrontations, setConfrontations] = useState([])

    const loadConfrontationsToEndByChampionships = async () => {
        const response = await api.getAllConfrontation()
        setConfrontations(response.data)
    }

    useEffect(() => {
        loadConfrontationsToEndByChampionships()
    }, [])

    return (
        <FlatList
            list={confrontations}
            renderItem={(item) => <MatchList data={item} />}
            renderWhenEmpty={() => <div>Não há confrontos!</div>}
        />
    )
}

export default Matches