import React from 'react'
import { GiSoccerField, GiSoccerBall } from 'react-icons/gi'
import { VscHome } from 'react-icons/vsc'
import { AiOutlineBarChart } from 'react-icons/ai'

import { Link, useParams } from 'react-router-dom'

import {
    makeStyles, Card, CardActionArea, CardContent,
    CardMedia, Typography, Grid
} from '@material-ui/core'

const Eurocopa = () => {

    const { id } = useParams()
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography className={classes.typography} align='center' gutterBottom variant="h5" component="h2">
                EUROCOPA 2020
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
                        <Link style={{ textDecoration: 'none' }} to={`/jackpot/${id}`}>
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
                        <Link style={{ textDecoration: 'none' }} to={`/jackpot/${id}`}>
                            <CardActionArea className={classes.cardarea}>
                                <AiOutlineBarChart color='#022c6f' size={60} />
                                <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                                    Resultados
                                </Typography>
                            </CardActionArea>
                        </Link>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card
                        className={classes.card}
                    >
                        <Link style={{ textDecoration: 'none' }} to={`/jackpot/${id}`}>
                            <CardActionArea className={classes.cardarea}>
                                <GiSoccerBall color='#022c6f' size={60} />
                                <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                                    Tabela
                                </Typography>
                            </CardActionArea>
                        </Link>
                    </Card>
                </Grid>

            </Grid>
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
    }

})

export default Eurocopa
