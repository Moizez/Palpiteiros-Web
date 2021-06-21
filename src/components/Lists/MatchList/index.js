import React from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { addHours, format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'

import {
    makeStyles, TextField, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

import { ImageUrl } from '../../../services/api_fetch'
import redcard from '../../../assets/images/redcard.png'
import yellowcard from '../../../assets/images/yellowcard.png'
import penalty from '../../../assets/images/penalty.jpg'

const MatchList = ({ data }) => {

    const classes = useStyles()
    const history = useHistory()

    const dateFormat = (date) => {
        const res = parseISO(date)
        const result = addHours(res, 3)
        return format(result, "d 'de' LLL 'às' H:mm", { locale: pt })
    }

    const initialFormState = {
        home: 0,
        away: 0,
        homepenalty: 0,
        awaypenalty: 0,
        homeyellow: 0,
        homered: 0,
        awayyellow: 0,
        awayred: 0,
    }

    const formik = useFormik({
        initialValues: initialFormState,
        onSubmit: async (values) => {

            console.log(values)

        }
    })

    return (
        <>
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

                            {data.round.name.search('rodada') < 0 &&
                                <TableRow>
                                    <TableCell>Pênaltis da {data.teamHome?.initials}</TableCell>
                                    <TableCell align="right">
                                        <img className={classes.flag} width="40" src={penalty} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <TextField
                                            id="homepenalty"
                                            name='homepenalty'
                                            label='Pênalti'
                                            type="number"
                                            size='small'
                                            style={{ width: 90 }}
                                            variant='outlined'
                                            value={formik.values.homepenalty > 0
                                                ? formik.values.homepenalty
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
                                            id="awaypenalty"
                                            name='awaypenalty'
                                            label='Pênalti'
                                            type="number"
                                            size='small'
                                            style={{ width: 90 }}
                                            variant='outlined'
                                            value={formik.values.awaypenalty > 0
                                                ? formik.values.awaypenalty
                                                : 0}
                                            onChange={formik.handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <img className={classes.flag} width="40" src={penalty} />
                                    </TableCell>
                                    <TableCell>Pênaltis da {data.teamVisiting?.initials}</TableCell>
                                </TableRow>
                            }

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

            <div className={classes.buttons}>
                <Button
                    onClick={() => { }}
                    className={classes.saveButton}
                    startIcon={<SaveIcon />}
                    color="primary"
                    variant="contained"

                >
                    Salvar
                </Button>
            </div>
        </>
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
        justifyContent: 'flex-end',
        marginBottom: 30,
        marginTop: -20
    }
})

export default MatchList
