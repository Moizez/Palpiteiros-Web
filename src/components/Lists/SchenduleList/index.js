import React from 'react'
import { addHours, format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'

import {
    makeStyles, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core'

import { ImageUrl } from '../../../services/api_fetch'
import redcard from '../../../assets/images/redcard.png'
import yellowcard from '../../../assets/images/yellowcard.png'
import penalty from '../../../assets/images/penalty.jpg'

const SchenduleList = ({ data }) => {

    const classes = useStyles()

    const dateFormat = (date) => {
        const res = parseISO(date)
        const result = addHours(res, 3)
        return format(result, "d 'de' LLL 'às' H:mm", { locale: pt })
    }

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.title} colSpan={4}>{data.round?.name}</TableCell>
                        <TableCell
                            className={classes.title}
                            align="right"
                            colSpan={4}
                        >
                            {dateFormat(data.confrontationLocation?.date)}
                        </TableCell>
                    </TableRow>

                </TableHead>

                <TableBody>
                    <TableRow>
                        <TableCell align="center">{data.teamHome?.initials}</TableCell>
                        <TableCell align="right">
                            <img className={classes.flag} alt='bandeiras' width="40" src={`${ImageUrl}${data.teamHome?.id}`} />
                        </TableCell>
                        <TableCell align="right">{data.scoreBoard?.golsHome}</TableCell>
                        <TableCell align="center">X</TableCell>
                        <TableCell align="left">{data.scoreBoard?.golsVisiting}</TableCell>
                        <TableCell align="left">
                            <img className={classes.flag} alt='bandeiras' width="40" src={`${ImageUrl}${data.teamVisiting?.id}`} />
                        </TableCell>
                        <TableCell align="center">{data.teamVisiting?.initials}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell align="center">Amarelos</TableCell>
                        <TableCell align="right">
                            <img className={classes.flag} alt='cartão amarelo' width="40" src={yellowcard} />
                        </TableCell>
                        <TableCell align="right">{data.scoreBoard?.yellowHomeCard}</TableCell>
                        <TableCell align="center">X</TableCell>
                        <TableCell align="left">{data.scoreBoard?.yellowVisitingCard}</TableCell>
                        <TableCell align="left">
                            <img className={classes.flag} alt='cartão amarelo' width="40" src={yellowcard} />
                        </TableCell>
                        <TableCell align="center">Amarelos</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell align="center">Vermelhos</TableCell>
                        <TableCell align="right">
                            <img className={classes.flag} alt='cartão vermelho' width="40" src={redcard} />
                        </TableCell>
                        <TableCell align="right">{data.scoreBoard?.redHomeCard}</TableCell>
                        <TableCell align="center">X</TableCell>
                        <TableCell align="left">{data.scoreBoard?.redVisitingCard}</TableCell>
                        <TableCell align="left">
                            <img className={classes.flag} alt='cartão vermelho' width="40" src={redcard} />
                        </TableCell>
                        <TableCell align="center">Vermelhos</TableCell>
                    </TableRow>

                    {!!data?.scoreBoard?.penalty &&
                        <TableRow>
                            <TableCell>Pênaltis da {data.teamHome?.initials}</TableCell>
                            <TableCell align="right">
                                <img className={classes.flag} alt='pênalti' width="40" src={penalty} />
                            </TableCell>
                            <TableCell align="right">{data.scoreBoard?.penalty?.golsHome || 0}</TableCell>
                            <TableCell align="center">X</TableCell>
                            <TableCell align="left">{data.scoreBoard?.penalty?.golsVisiting || 0}</TableCell>
                            <TableCell>
                                <img className={classes.flag} alt='pênalti' width="40" src={penalty} />
                            </TableCell>
                            <TableCell align="right">Pênaltis da {data.teamVisiting?.initials}</TableCell>
                        </TableRow>
                    }

                </TableBody>
            </Table>
        </TableContainer>
    )
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    container: {
        marginBottom: 30
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    flag: {
        marginTop: 6
    },
})

export default SchenduleList
