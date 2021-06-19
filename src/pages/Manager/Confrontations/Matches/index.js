import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const Matches = ({ data }) => {

    const classes = useStyles()

    return (
        <TableContainer component={Paper}>
            {data?.map(i =>
                <Table key={i.id} className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={4}>{i.round?.name}</TableCell>
                            <TableCell align="center" colSpan={4}>{i.confrontationLocation?.date}</TableCell>
                        </TableRow>

                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>{i.teamHome?.initials}</TableCell>
                            <TableCell>BAN</TableCell>
                            <TableCell>INPUT A</TableCell>
                            <TableCell>X</TableCell>
                            <TableCell>INPUT B</TableCell>
                            <TableCell>BAN</TableCell>
                            <TableCell>{i.teamVisiting?.initials}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell colSpan={3}>YEL</TableCell>
                            <TableCell colSpan={3}>X</TableCell>
                            <TableCell colSpan={3}>YEL</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    )
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

export default Matches
