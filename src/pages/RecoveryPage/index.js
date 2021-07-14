import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    Button, CssBaseline, TextField, Grid, Container,
    makeStyles, CircularProgress, InputAdornment, IconButton
} from '@material-ui/core'

import SaveIcon from '@material-ui/icons/Save'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { AuthContext } from '../../contexts/AuthContext'
import logo from '../../assets/images/logo.png'

const RecoveryPage = () => {

    const classes = useStyles()
    const { handleSignIn, loadingAuth } = useContext(AuthContext)
    const [show, setShow] = useState(false)

    const initialFormState = { password: '', passwordConfirmation: '' }
    const validationSchema = yup.object().shape({
        password: yup.string().required('Senha é obrigatório!'),
        passwordConfirmation: yup.string()
            .test('As senhas correspondem', 'As senhas não correspondem!', function (value) {
                return this.parent.password === value
            })
    })

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values) => {

        }
    })

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img className={classes.logo} src={logo} alt='' />

                <Grid container >
                    <Grid item xs={12}>

                        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                            <Grid direction='column' container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoFocus
                                        fullWidth
                                        variant='outlined'
                                        type='password'
                                        id="password"
                                        name="password"
                                        label='Digite uma nova senha'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Grid direction='column' container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        type={show ? 'text' : 'password'}
                                        id="passwordConfirmation"
                                        name="passwordConfirmation"
                                        label='Confirme a nova senha'
                                        value={formik.values.passwordConfirmation}
                                        onChange={formik.handleChange}
                                        error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                                        helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        color='default'
                                                        onClick={() => setShow(!show)}
                                                    >
                                                        {show ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >{loadingAuth ? (
                                <CircularProgress color='inherit' size={24} />
                            ) : (
                                <span>Restaurar</span>
                            )
                                }
                            </Button>
                        </form>

                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#022c6f',

        '&:hover': {
            background: '#022c9f'
        },
    },
    logo: {
        width: 200,
        marginBottom: 20
    },
    title: {
        flexGrow: 1,
        textTransform: 'capitalize',
        margin: 0,
    },
    input: {
        width: 250
    }
}));

export default RecoveryPage