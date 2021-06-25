import React from 'react'
import { makeStyles, Fab } from '@material-ui/core'
import ReplyIcon from '@material-ui/icons/Reply'

const FabButton = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Fab variant="extended">
                <ReplyIcon className={classes.extendedIcon} />
                Voltar
            </Fab>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}))

export default FabButton
