import React from "react"

import { Snackbar, SnackbarContent } from '@material-ui/core'

const SnackbarWrap = (open, snackColor, snackMessage) => {

    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={3000}
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
    )

}

export default SnackbarWrap