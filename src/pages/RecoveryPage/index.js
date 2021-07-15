import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    Button, CssBaseline, TextField, Grid, Container, makeStyles,
    InputAdornment, IconButton, Snackbar, SnackbarContent
} from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import logo from '../../assets/images/logo.png'
import api from '../../services/api'

const RecoveryPage = () => {

    const classes = useStyles()
    const { token } = useParams()
    const [show, setShow] = useState(false)
    const [snack, setSnack] = useState(false)
    const [snackMessage, setSnackMessage] = useState('')
    const [snackColor, setSnackColor] = useState('')
    const [id, setId] = useState(null)

    console.log(token)

    const validateLink = async () => {
        const response = await api.onCheckToken(token)
        console.log(response)

        if (response?.status >= 200 && response?.status <= 299) {
            setId(response.data.id)
        } else {
            setSnackColor('#da1e37')
            setSnackMessage('Link de redefinição de senha inválido ou expirado!')
            handleOpenSnack()
        }
    }

    useEffect(() => {
        if (token) {
            validateLink()
        }
    }, [])

    const initialFormState = { password: '', passwordConfirmation: '' }
    const validationSchema = yup.object().shape({
        password: yup.string().required('Senha é obrigatório!'),
        passwordConfirmation: yup.string()
            .test('As senhas correspondem', 'A senha não correspondem!', function (value) {
                return this.parent.password === value
            })
    })

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const response = await api.onRecoverPassword(id, values.password)

            if (response?.status >= 200 && response?.status <= 299) {
                setSnackColor('#070')
                setSnackMessage('Nova senha salva com sucesso!')
                handleOpenSnack()
            } else {
                setSnackColor('#da1e37')
                setSnackMessage('Link de redefinição de senha inválido ou expirado!')
                handleOpenSnack()
            }

        }
    })

    const handleOpenSnack = () => setSnack(true)
    const handleCloseSnack = () => setSnack(false)

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img className={classes.logo} src={logo} alt='' />

                <label className={classes.title}>Crie sua nova senha</label>

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
                                        label='Digite sua nova senha'
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
                            >
                                <span>Salvar</span>
                            </Button>
                        </form>

                    </Grid>
                </Grid>
            </div>

            {snack &&
                <Snackbar
                    open={snack}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={5000}
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
        textTransform: 'uppercase',
    },
    input: {
        width: 250
    }
}));

export default RecoveryPage