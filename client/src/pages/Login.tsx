import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css'
import useAppDispatch from '../hooks/useAppDispatch';
import { login } from '../redux/reducers/UserReducer';
import { getAllProject } from '../redux/reducers/ProjectReducer';
import { relative } from 'path';
import login1 from '../demoImages/login1.png';
import login2 from '../demoImages/login2.jpg';
import logo from '../demoImages/logo.png';

const defaultTheme = createTheme();

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token: any = localStorage.getItem("token" || "")

    useEffect(() => {
        if (token) {
            dispatch(getAllProject())
            navigate('/');
        }
        else {
            navigate('/login')
        }
    }, [token])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email !== '' && password !== '') {
            dispatch(login({ email, password }));
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
        else {
            setErrorMessage('Please check inputs again');
        }
    };


    return (
        <ThemeProvider theme={defaultTheme}>
            <img src={logo} alt="" className='logo' />
            <div className="intro">
                <h2>Login with email</h2>
                <p>Explore universe of opportunity with jobs, events,<br />exclusive projects and other resources dedicated to<br /> student</p>
            </div>
            <Container component="main" maxWidth="xs" >
                <div className="top-right">
                    <img src={login1} alt="" className='login1' />
                </div>

                <Box
                    sx={{
                        marginTop: 40,
                        marginLeft: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'fixed',
                        width: 400,
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type='email'
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <p style={{ color: 'red' }} >{errorMessage}</p>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to={''} >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register"><p>Don't have account? Signup</p></Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <div className="bottom-left">
                    <img src={login2} alt="" className='login2' />
                </div>
            </Container>
        </ThemeProvider>
    );
}