import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Button, Typography, Paper } from '@mui/material';
import { useValidPassword, useValidUsername } from '../../../hooks/useAuthHooks';
import { Password, Username } from '../../authComponents';

const LogIn: React.FunctionComponent = () => {
    const { username, setUsername, usernameIsValid } = useValidUsername('');
    const { password, setPassword, passwordIsValid } = useValidPassword('');
    const [error, setError] = useState('');

    const isValid = !usernameIsValid || username.length === 0 || !passwordIsValid || password.length === 0;

    const navigate = useNavigate();

    const checkHardCodedCredentials = (username: string, password: string) => {
        if (username !== 'administrator' || password !== 'Team_39!') {
            alert('Incorrect username or password');
            throw new Error('Invalid credentials');
        }
    };

    const signInClicked = async () => {
        try {
            checkHardCodedCredentials(username, password);
            navigate('/admin');
        } catch (err: any) {
            if (err.code === 'UserNotConfirmedException') {
                navigate('verify');
            } else {
                setError(err.message);
            }
        }
    };

    const passwordResetClicked = async () => {
        navigate('requestcode');
    };

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid xs={11} sm={6} lg={4} container direction="row" justifyContent="center" alignItems="center" item>
                <Paper style={{ width: '100%', padding: 32 }}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Box m={2}>
                            <Typography variant="h3">Sign in</Typography>
                        </Box>
                        <Box width="80%" m={1}>
                            <Username usernameIsValid={usernameIsValid} setUsername={setUsername} />
                        </Box>
                        <Box width="80%" m={1}>
                            <Password label="Password" passwordIsValid={passwordIsValid} setPassword={setPassword} />
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                                <Box onClick={passwordResetClicked} mt={2}>
                                    <Typography variant="body2">Forgot Password?</Typography>
                                </Box>
                            </Grid>
                        </Box>
                        <Box mt={2}>
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        </Box>
                        <Box mt={2}>
                            <Grid container direction="row" justifyContent="center">
                                <Box m={1}>
                                    <Button color="secondary" variant="contained" onClick={() => navigate(-1)}>
                                        Cancel
                                    </Button>
                                </Box>
                                <Box m={1}>
                                    <Button disabled={isValid} color="primary" variant="contained" onClick={signInClicked}>
                                        Sign In
                                    </Button>
                                </Box>
                            </Grid>
                        </Box>
                        <Box mt={2}>
                            <Box onClick={() => navigate('/signup')}>
                                <Typography variant="body1">Register a new account</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LogIn;
