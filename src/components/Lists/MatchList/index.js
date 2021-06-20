import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { addHours, format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'

import { makeStyles, TextField } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { ImageUrl } from '../../../services/api_fetch'
import redcard from '../../../assets/images/redcard.png'
import yellowcard from '../../../assets/images/yellowcard.png'

const MatchList = ({ data }) => {

    const classes = useStyles()

    const dateFormat = (date) => {
        const res = parseISO(date)
        const result = addHours(res, 3)
        return format(result, "d 'de' LLL 'às' H:mm", { locale: pt })
    }

    const initialFormState = {
        home: 0,
        away: 0,
        homeyellow: 0,
        homered: 0,
        awayyellow: 0,
        awayred: 0,
    }

    const formik = useFormik({
        initialValues: initialFormState,
        onSubmit: async (values) => {

        }
    })

    return (
        <TableContainer className={classes.container} component={Paper}>
            <form onSubmit={formik.handleSubmit}>
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
                                <img className={classes.flag} width="40" src={`${ImageUrl}${data.teamHome?.id}`} />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    id="home"
                                    name='home'
                                    label={data.teamHome?.initials}
                                    type="number"
                                    size='small'
                                    style={{ width: 90 }}
                                    variant='outlined'
                                    value={formik.values.home > 0
                                        ? formik.values.home
                                        : 0
                                    }
                                    onChange={formik.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </TableCell>
                            <TableCell align="center">X</TableCell>
                            <TableCell align="left">
                                <TextField
                                    id="away"
                                    name='away'
                                    label={data.teamVisiting?.initials}
                                    type="number"
                                    size='small'
                                    style={{ width: 90 }}
                                    variant='outlined'
                                    value={formik.values.away > 0
                                        ? formik.values.away
                                        : 0}
                                    onChange={formik.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <img className={classes.flag} width="40" src={`${ImageUrl}${data.teamVisiting?.id}`} />
                            </TableCell>
                            <TableCell align="center">{data.teamVisiting?.initials}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Cartões amarelos</TableCell>
                            <TableCell align="right">
                                <img className={classes.flag} width="40" src={yellowcard} />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    id="homeyellow"
                                    name='homeyellow'
                                    label='Amarelos'
                                    type="number"
                                    size='small'
                                    style={{ width: 90 }}
                                    variant='outlined'
                                    value={formik.values.homeyellow > 0
                                        ? formik.values.homeyellow
                                        : 0}
                                    onChange={formik.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </TableCell>
                            <TableCell align="center">X</TableCell>
                            <TableCell>
                                <TextField
                                    id="awayyellow"
                                    name='awayyellow'
                                    label='Amarelos'
                                    type="number"
                                    size='small'
                                    style={{ width: 90 }}
                                    variant='outlined'
                                    value={formik.values.awayyellow > 0
                                        ? formik.values.awayyellow
                                        : 0}
                                    onChange={formik.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <img className={classes.flag} width="40" src={yellowcard} />
                            </TableCell>
                            <TableCell>Cartões amarelos</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Cartões vermelhos</TableCell>
                            <TableCell align="right">
                                <img className={classes.flag} width="40" src={redcard} />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    id="homered"
                                    name='homered'
                                    label='Vermelhos'
                                    type="number"
                                    size='small'
                                    style={{ width: 90 }}
                                    variant='outlined'
                                    value={formik.values.homered > 0
                                        ? formik.values.homered
                                        : 0}
                                    onChange={formik.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </TableCell>
                            <TableCell align="center">X</TableCell>
                            <TableCell>
                                <TextField
                                    id="awayred"
                                    name='awayred'
                                    label='Vermelhos'
                                    type="number"
                                    size='small'
                                    style={{ width: 90 }}
                                    variant='outlined'
                                    value={formik.values.awayred > 0
                                        ? formik.values.awayred
                                        : 0}
                                    onChange={formik.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <img className={classes.flag} width="40" src={redcard} />
                            </TableCell>
                            <TableCell>Cartões vermelhos</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
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
        fontWeight: 'bold'
    },
    flag: {
        marginTop: 6
    }
})

export default MatchList
