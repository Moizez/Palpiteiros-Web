import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../services/api_championships'

import {
    makeStyles, Card, CardActionArea, CardContent,
    CardMedia, Typography, Grid
} from '@material-ui/core'

import logo from '../../../assets/images/euro2020.jpg'

const ManagerHome = () => {

    const classes = useStyles()
    const [championships, setChampionships] = useState([])

    useEffect(() => {
        (async () => {
            const response = await api.getAllOfficialChampionships()
            setChampionships(response.data)
        })()
    }, [])

    return (
        <div className={classes.root}>
            <Typography className={classes.typography} align='center' gutterBottom variant="h5" component="h2">
                CAMPEONATOS DISPONÍVEIS
            </Typography>
            {championships?.map(item =>
                <Grid key={item?.id} container spacing={3}>
                    <Grid item xs={6}>
                        <Card
                            className={classes.card}
                        >
                            <Link style={{ textDecoration: 'none' }} to={`/jackpot/${item?.id}`}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={logo}
                                        title="Eurocopa 2020"
                                    />
                                    <CardContent>
                                        <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                                            {item?.name}
                                        </Typography>
                                        <Typography align='justify' variant="body2" color="textSecondary" component="p">
                                            A Eurocopa - Campeonato Europeu de Futebol é o principal campeonato de futebol
                                            de seleções dos países da UEFA. A Eurocopa é realizada a cada quatro anos desde
                                            1960, primeira edição da competição em 1960.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid>

                </Grid>
            )}
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    card: {
        maxWidth: 420,
    },
    media: {
        height: 200,
    },
    typography: {
        color: '#022c6f',
        fontWeight: 'bold'
    }

})

export default ManagerHome
