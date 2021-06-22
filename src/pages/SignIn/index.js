import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    Button, CssBaseline, TextField, FormControlLabel, Checkbox,
    Container, makeStyles, CircularProgress, InputAdornment, IconButton
} from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import EmailIcon from '@material-ui/icons/Email'

import { AuthContext } from '../../contexts/AuthContext'
import logo from '../../assets/images/logo.png'

const SignIn = () => {

    const classes = useStyles()
    const { handleSignIn, loadingAuth } = useContext(AuthContext)
    const [show, setShow] = useState(false)

    const initialFormState = {
        email: '',
        password: ''
    }

    const validationSchema = yup.object().shape({
        email: yup.string().email('Entre com um e-mail válido!').required('O e-mail é obrigatório!'),
        password: yup.string('Entre com sua senha').required('A senha é obrigatória!'),
    })

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await handleSignIn(values.email.trim(), values.password.trim())
        }
    })

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img className={classes.logo} src={logo} alt='' />
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton color='default'>
                                        <EmailIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        id="password"
                        name="password"
                        label="Senha"
                        variant='outlined'
                        fullWidth
                        required
                        type={show ? 'text' : 'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        autoComplete="current-password"
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
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

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Lembrar-me?"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >{loadingAuth ? (
                        <CircularProgress color='inherit' size={24} />
                    ) : (
                        <span>Entrar</span>
                    )
                        }
                    </Button>
                </form>
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
}));

export default SignIn