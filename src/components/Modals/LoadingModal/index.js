import React from 'react';
import { makeStyles, Modal, Backdrop, Fade } from '@material-ui/core'
import Lottie from 'react-lottie'

import Loading from '../../../assets/lotties/loading.json'

const LoadingModal = ({ open, handleClose, message, lottie }) => {

    const classes = useStyles()

    const lottieConfig = {
        loop: true,
        autoplay: true,
        animationData: lottie ? lottie : Loading,
    }

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <Lottie
                        options={lottieConfig}
                        height={120}
                        width={120} />
                    <h3>{message}</h3>
                </div>
            </Fade>
        </Modal>
    );
}

export default LoadingModal

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

}));
