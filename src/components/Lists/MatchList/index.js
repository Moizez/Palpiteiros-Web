import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { addHours, format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'

import api_scoreboard from '../../../services/api_scoreboard'
import api_confrontation from '../../../services/api_confrontation'

import {
    makeStyles, TextField, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Button,
    Snackbar, SnackbarContent, Switch, FormControlLabel
} from '@material-ui/core'
import {SaveIcon, EditIcon} from '@material-ui/icons'

import { ImageUrl } from '../../../services/api_fetch'
import redcard from '../../../assets/images/redcard.png'
import yellowcard from '../../../assets/images/yellowcard.png'
import penalty from '../../../assets/images/penalty.jpg'

const MatchList = ({ data }) => {

    const classes = useStyles()

    const [snackMessage, setSnackMessage] = useState('')
    const [snack, setSnack] = useState(false)
    const [snackColor, setSnackColor] = useState('')

    const [isPenalty, setPenalty] = useState(false)
    const [isSuspended, setSuspended] = useState(!!data?.suspended)

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

            if (!isSuspended) {
                if (data.id && (!isKnockout() || isKnockout()) && !isPenalty) {
                    await api_scoreboard.saveScore(values, data.id)
                    return
                }
                await handleSaveKnockout(data.id)
                return
            }

            await handleSaveSuspend(data.id)

        }
    })

    const handleSaveSuspend = async () => {
        if (isSuspended) {
            await api_confrontation.setSuspend(data.id)
        }
    }

    const handleSaveKnockout = async (values) => {
        if (isKnockout() && isPenalty) {
            await api_scoreboard.savePenaltyScore(values, data.id);
        }
    }

    const isKnockout = () => {
        if (data) {
            if (data?.round?.name?.search("rodada") < 0) {
                return true;
            }
            return false;
        }
        return false;
    }

    const dateFormat = (date) => {
        const res = parseISO(date)
        const result = addHours(res, 3)
        return format(result, "d 'de' LLL 'às' H:mm", { locale: pt })
    }

    const handleSuspend = () => setSuspended(!isSuspended)
    const handlePenalty = () => setPenalty(!isPenalty)

    const handleOpenSnack = () => setSnack(true)
    const handleCloseSnack = () => setSnack(false)

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

                            <TableRow>
                                <TableCell>Jogo suspenso?</TableCell>
                                <TableCell align="right">
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={isSuspended}
                                                onChange={handleSuspend}
                                                color='secondary'
                                            />
                                        }
                                        label={isSuspended ? 'SIM' : 'NÃO'}
                                    />
                                </TableCell>
                                <TableCell colSpan={2}></TableCell>
                                <TableCell align="right"></TableCell>
                                {isKnockout() &&
                                    <>
                                        <TableCell align="right">Pênaltis?</TableCell>
                                        <TableCell align="right">
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={isPenalty}
                                                        onChange={handlePenalty}
                                                        color="primary"
                                                    />
                                                }
                                                label={isPenalty ? 'SIM' : 'NÃO'}
                                            />
                                        </TableCell>
                                    </>
                                }
                            </TableRow>

                            {isPenalty &&
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
                                    <TableCell align="right">Pênaltis da {data.teamVisiting?.initials}</TableCell>
                                </TableRow>
                            }

                        </TableBody>
                    </Table>
                </form>

            </TableContainer>

            <div className={classes.buttons}>
                {!data?.scoreBoard
                    ?
                    <Button
                        onClick={formik.handleSubmit}
                        className={classes.saveButton}
                        startIcon={<SaveIcon />}
                        color="primary"
                        variant="contained"
                    >
                        Salvar
                    </Button>
                    :
                    <Button
                        onClick={formik.handleSubmit}
                        className={classes.updateButton}
                        startIcon={<EditIcon />}
                        color="primary"
                        variant="contained"
                    >
                        Atualizar
                    </Button>
                }
            </div>

            {snack &&
                <Snackbar
                    open={snack}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    autoHideDuration={3000}
                    onClose={handleCloseSnack}
                >
                    <SnackbarContent
                        style={{ backgroundColor: snackColor ? snackColor : '#070' }}
                        message={
                            <span>
                                {snackMessage}
                            </span>
                        }
                    />
                </Snackbar>
            }
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
    updateButton: {
        backgroundColor: '#458CB8',

        '&:hover': {
            background: '#33617D'
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
