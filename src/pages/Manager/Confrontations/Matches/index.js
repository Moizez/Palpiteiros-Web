import React from 'react'
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

import { ImageUrl } from '../../../../services/api_fetch'
import redcard from '../../../../assets/images/redcard.png'
import yellowcard from '../../../../assets/images/yellowcard.png'

const Matches = ({ data }) => {

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
        <TableContainer component={Paper}>
            <form onSubmit={formik.handleSubmit}>
                {data?.map(i =>
                    <Table key={i.id} className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={4}>{i.round?.name}</TableCell>
                                <TableCell
                                    align="center"
                                    colSpan={4}
                                >
                                    {dateFormat(i.confrontationLocation?.date)}
                                </TableCell>
                            </TableRow>

                        </TableHead>

                        <TableBody>
                            <TableRow>
                                <TableCell>{i.teamHome?.initials}</TableCell>
                                <TableCell>
                                    <img width="30" src={`${ImageUrl}${i.teamHome?.id}`} />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id="home"
                                        name='home'
                                        label={i.teamHome?.initials}
                                        type="number"
                                        size='small'
                                        style={{width: 80}}
                                        variant='outlined'
                                        value={formik.values.home}
                                        onChange={formik.handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>X</TableCell>
                                <TableCell>INPUT B</TableCell>
                                <TableCell>
                                    <img width="30" src={`${ImageUrl}${i.teamVisiting?.id}`} />
                                </TableCell>
                                <TableCell>{i.teamVisiting?.initials}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>
                                    <img width="30" src={yellowcard} />
                                </TableCell>
                                <TableCell>INPUT</TableCell>
                                <TableCell>X</TableCell>
                                <TableCell>INPUT</TableCell>
                                <TableCell>
                                    <img width="30" src={yellowcard} />
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>
                                    <img width="30" src={redcard} />
                                </TableCell>
                                <TableCell>INPUT</TableCell>
                                <TableCell>X</TableCell>
                                <TableCell>INPUT</TableCell>
                                <TableCell>
                                    <img width="30" src={redcard} />
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                )}
            </form>
        </TableContainer>
    )
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

export default Matches
