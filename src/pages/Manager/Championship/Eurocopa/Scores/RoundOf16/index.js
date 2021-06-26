import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import FlatList from 'flatlist-react'
import { makeStyles, Button } from '@material-ui/core'
import ReplyIcon from '@material-ui/icons/Reply'

import api from '../../../../../../services/api_qualifiers'
import MatchList from '../../../../../../components/Lists/MatchList'

const RoundOf16 = ({ id, showLoading, hideLoading }) => {

    const classes = useStyles()
    const history = useHistory()
    const [roundOf16, setRoundOf16] = useState([])

    const loadRoundOf16 = async () => {
        showLoading()
        const response = await api.getRoundOf16(id)
        setRoundOf16(response.data)
        hideLoading()
    }

    useEffect(() => {
        loadRoundOf16()
    }, [])

    return (
        <>
            <FlatList
                list={roundOf16}
                renderItem={(item, index) =>
                    <MatchList
                        key={index}
                        data={item}
                        load={loadRoundOf16}
                    />
                }
                renderWhenEmpty={() => <div style={{ marginBottom: 30 }}>Não há confrontos!</div>}
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
        backgroundColor: '#495057',
        marginRight: '2%',

        '&:hover': {
            background: '#343a40'
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

export default RoundOf16
