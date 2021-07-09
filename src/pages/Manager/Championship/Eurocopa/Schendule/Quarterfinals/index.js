import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import FlatList from 'flatlist-react'
import { makeStyles, Button } from '@material-ui/core'
import ReplyIcon from '@material-ui/icons/Reply'

import api from '../../../../../../services/api_qualifiers'
import SchenduleList from '../../../../../../components/Lists/SchenduleList'

const Quarterfinals = ({ id, showLoading, hideLoading }) => {

    const classes = useStyles()
    const history = useHistory()
    const [quarterfinals, setQuarterfinals] = useState([])

    const loadQuarterfinals = async () => {
        showLoading()
        const response = await api.getAllQuarterfinals(id)
        setQuarterfinals(response.data)
        hideLoading()
    }

    useEffect(() => {
        loadQuarterfinals()
    }, [])

    return (
        <>
            <FlatList
                list={quarterfinals}
                renderItem={(item, index) =>
                    <SchenduleList
                        key={index}
                        data={item}
                        load={loadQuarterfinals}
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

export default Quarterfinals
