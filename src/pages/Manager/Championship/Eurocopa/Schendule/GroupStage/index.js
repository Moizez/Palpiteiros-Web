import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import {
    makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography
} from '@material-ui/core'
import ReplyIcon from '@material-ui/icons/Reply'

import api from '../../../../../../services/api_groups'
import { ImageUrl } from '../../../../../../services/api_fetch'

const GroupStage = ({ id }) => {
    const classes = useStyles()
    const [groups, setGroups] = useState([])

    const loadGroups = async () => {
        const response = await api.getGroupsByChampionshipId(id)
        setGroups(response.data)
    }

    console.log(groups)

    useEffect(() => {
        loadGroups()
    }, [])

    return (
        <TableContainer component={Paper}>
            {groups?.map(group =>
                <>
                    <Typography variant="h6" gutterBottom component="div">
                        Grupo {group?.name}
                    </Typography>
                    <Table key={group?.id} className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"></TableCell>
                                <TableCell className={classes.title}>Seleções</TableCell>
                                <TableCell className={classes.title} align="right">P</TableCell>
                                <TableCell className={classes.title} align="right">J</TableCell>
                                <TableCell className={classes.title} align="right">V</TableCell>
                                <TableCell className={classes.title} align="right">E</TableCell>
                                <TableCell className={classes.title} align="right">D</TableCell>
                                <TableCell className={classes.title} align="right">GP</TableCell>
                                <TableCell className={classes.title} align="right">GC</TableCell>
                                <TableCell className={classes.title} align="right">SG</TableCell>
                                <TableCell className={classes.title} align="right">%</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {group?.punctuations?.map(row =>
                                <TableRow key={row?.id}>
                                    <TableCell align="left">
                                        <img className={classes.flag} alt='bandeiras' width="40" src={`${ImageUrl}${row?.team?.id}`} />
                                    </TableCell>
                                    <TableCell>{row?.team?.initials}</TableCell>
                                    <TableCell align="right">{row?.points}</TableCell>
                                    <TableCell align="right">{row?.matchs}</TableCell>
                                    <TableCell align="right">{row?.victory}</TableCell>
                                    <TableCell align="right">{row?.draw}</TableCell>
                                    <TableCell align="right">{row?.defeat}</TableCell>
                                    <TableCell align="right">{row?.goalsMatchs}</TableCell>
                                    <TableCell align="right">{row?.goalsAgainst}</TableCell>
                                    <TableCell align="right">{row?.goalDifference}</TableCell>
                                    <TableCell align="right">{row?.percentage}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </>
            )}
        </TableContainer>
    )
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    flag: {
        marginTop: 6
    },
    title: {
        fontWeight: 'bold'
    },
})

export default GroupStage
