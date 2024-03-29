import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
    makeStyles, Card, CardActionArea, Typography, Grid,
    Snackbar, SnackbarContent
} from '@material-ui/core'

import {
    GiSoccerField, GiSoccerBall, GiSoccerKick, GiTrophiesShelf,
    GiTrophyCup, GiRibbonMedal
} from 'react-icons/gi'
import { VscHome } from 'react-icons/vsc'
import { AiOutlineBarChart } from 'react-icons/ai'

import api from '../../../services/api_qualifiers'
import ConfimationModal from '../../../components/Modals/ConfimationModal'


const Championship = () => {

    const { name, id } = useParams()
    const classes = useStyles()

    const [snackMessage, setSnackMessage] = useState('')
    const [snack, setSnack] = useState(false)
    const [snackColor, setSnackColor] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [open, setOpen] = useState(false)
    const [option, setOption] = useState('')

    const handleGenerateRoundOf16 = async () => {
        setOption('roundOf16')
        setModalTitle('Deseja realmente gerar as oitavas?')
        handleOpen()
    }

    const handleGenerateQuarterfinals = async () => {
        setOption('quarterfinals')
        setModalTitle('Deseja realmente gerar as quartas?')
        handleOpen()
    }

    const handleGenerateSemi = async () => {
        setOption('semi')
        setModalTitle('Deseja realmente gerar as semifinais?')
        handleOpen()
    }

    const handleGenerateFinals = async () => {
        setOption('final')
        setModalTitle('Deseja realmente gerar a final?')
        handleOpen()
    }

    const handleGenerate = async () => {

        switch (option) {
            case 'roundOf16':
                const roundOf16 = await api.onGenerateRoundOf16(id)
                if (roundOf16.status === 200) {
                    setSnackColor('#070')
                    setSnackMessage('Oitavas geradas com sucesso!')
                    handleClose()
                    handleOpenSnack()
                } else {
                    setSnackColor('#da1e37')
                    setSnackMessage('Erro inesperado ao gerar as oitavas! Erro: ' + roundOf16.status)
                    handleClose()
                    handleOpenSnack()
                }
                return
            case 'quarterfinals':
                const quarterfinals = await api.onGenerateQuarterfinals(id)
                if (quarterfinals.status === 200) {
                    setSnackColor('#070')
                    setSnackMessage('Quartas geradas com sucesso!')
                    handleClose()
                    handleOpenSnack()
                } else {
                    setSnackColor('#da1e37')
                    setSnackMessage('Erro inesperado ao gerar as quartas! Erro: ' + quarterfinals.status)
                    handleClose()
                    handleOpenSnack()
                }
                return
            case 'semi':
                const semi = await api.onGenerateSemi(id)
                if (semi.status === 200) {
                    setSnackColor('#070')
                    setSnackMessage('Semifinais geradas com sucesso!')
                    handleClose()
                    handleOpenSnack()
                } else {
                    setSnackColor('#da1e37')
                    setSnackMessage('Erro inesperado ao gerar as Semifinais! Erro: ' + semi.status)
                    handleClose()
                    handleOpenSnack()
                }
                return
            case 'final':
                const final = await api.onGenerateFinals(id)
                if (final.status === 200) {
                    setSnackColor('#070')
                    setSnackMessage('Final geradas com sucesso!')
                    handleClose()
                    handleOpenSnack()
                } else {
                    setSnackColor('#da1e37')
                    setSnackMessage('Erro inesperado ao gerar a final! Erro: ' + final.status)
                    handleClose()
                    handleOpenSnack()
                }
                return
            default:
                return null;
        }

    }

    const handleOpenSnack = () => setSnack(true)
    const handleCloseSnack = () => setSnack(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div className={classes.root}>
            <Typography className={classes.typography} align='center' gutterBottom variant="h5" component="h2">
                {name} 2020
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Card
                        className={classes.card}
                    >
                        <Link style={{ textDecoration: 'none' }} to={`/`}>
                            <CardActionArea className={classes.cardarea}>
                                <VscHome color='#022c6f' size={60} />
                                <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                                    Início
                                </Typography>
                            </CardActionArea>
                        </Link>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card
                        className={classes.card}
                    >
                        <Link style={{ textDecoration: 'none' }} to={`/confrontation/${id}`}>
                            <CardActionArea className={classes.cardarea}>
                                <GiSoccerField color='#022c6f' size={60} />
                                <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                                    Confrontos
                                </Typography>
                            </CardActionArea>
                        </Link>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card
                        className={classes.card}
                    >
                        <Link style={{ textDecoration: 'none' }} to={`/scores/${id}`}>
                            <CardActionArea className={classes.cardarea}>
                                <AiOutlineBarChart color='#022c6f' size={60} />
                                <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                                    Placares
                                </Typography>
                            </CardActionArea>
                        </Link>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card
                        className={classes.card}
                    >
                        <Link style={{ textDecoration: 'none' }} to={`/schendule/${id}`}>
                            <CardActionArea className={classes.cardarea}>
                                <GiTrophiesShelf color='#022c6f' size={60} />
                                <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                                    Tabela
                                </Typography>
                            </CardActionArea>
                        </Link>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card
                        className={classes.card}
                    >
                        <CardActionArea onClick={handleGenerateRoundOf16} className={classes.cardarea}>
                            <GiSoccerKick color='#2d6a4f' size={60} />
                            <Typography style={{ color: '#2d6a4f' }} className={classes.typography} gutterBottom variant="h5" component="h2">
                                Gerar Oitavas
                            </Typography>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card
                        className={classes.card}
                    >
                        <CardActionArea onClick={handleGenerateQuarterfinals} className={classes.cardarea}>
                            <GiSoccerBall color='#fca311' size={60} />
                            <Typography style={{ color: '#fca311' }} className={classes.typography} gutterBottom variant="h5" component="h2">
                                Gerar Quartas
                            </Typography>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card
                        className={classes.card}
                    >
                        <CardActionArea onClick={handleGenerateSemi} className={classes.cardarea}>
                            <GiRibbonMedal color='#e85d04' size={60} />
                            <Typography style={{ color: '#e85d04' }} className={classes.typography} gutterBottom variant="h5" component="h2">
                                Gerar Semifinal
                            </Typography>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card
                        className={classes.card}
                    >
                        <CardActionArea onClick={handleGenerateFinals} className={classes.cardarea}>
                            <GiTrophyCup color='#9d0208' size={60} />
                            <Typography style={{ color: '#9d0208' }} className={classes.typography} gutterBottom variant="h5" component="h2">
                                Gerar Final
                            </Typography>
                        </CardActionArea>
                    </Card>
                </Grid>

            </Grid>
            {snack &&
                <Snackbar
                    open={snack}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    autoHideDuration={3000}
                    onClose={handleCloseSnack}
                >
                    <SnackbarContent
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: snackColor ? snackColor : '#070'
                        }}
                        message={
                            <span>
                                {snackMessage}
                            </span>
                        }
                    />
                </Snackbar>
            }

            {open &&
                <ConfimationModal
                    handleClose={handleClose}
                    open={open}
                    doConfirm={handleGenerate}
                    title={modalTitle}
                />
            }

        </div>
    )
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    cardarea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        maxWidth: 260,
    },
    media: {
        height: 100,
    },
    typography: {
        color: '#022c6f',
        fontWeight: 'bold',
        textTransform: 'capitalize'
    }

})

export default Championship
