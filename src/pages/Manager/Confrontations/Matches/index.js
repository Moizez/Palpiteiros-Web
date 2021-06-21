import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import FlatList from 'flatlist-react'
import { makeStyles, Button } from '@material-ui/core'
import ReplyIcon from '@material-ui/icons/Reply'

import api from '../../../../services/api_confrontation'

import MatchList from '../../../../components/Lists/MatchList'

const Matches = ({ id }) => {

    const classes = useStyles()
    const history = useHistory()

    const [confrontations, setConfrontations] = useState([])

    const loadConfrontationsToEndByChampionships = async () => {
        const response = await api.getAllConfrontation()
        setConfrontations(response.data)
    }

    useEffect(() => {
        loadConfrontationsToEndByChampionships()
    }, [])

    return (
        <>
            <FlatList
                list={confrontations}
                renderItem={(item) => <MatchList data={item} />}
                renderWhenEmpty={() => <div>Não há confrontos!</div>}
            />
            <Button
                onClick={() => history.goBack()}
                className={classes.backButton}
                startIcon={<ReplyIcon />}
                color="primary"
                variant="contained"

            >
                Voltar
            </Button>
        </>
    )
}

const useStyles = makeStyles({
    backButton: {
        backgroundColor: '#458CB8',
        marginRight: '2%',

        '&:hover': {
            background: '#33617D'
        },
    },
    saveButton: {
        backgroundColor: '#007200',

        '&:hover': {
            background: '#005200'
        },
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: -20
    }
})

export default Matches