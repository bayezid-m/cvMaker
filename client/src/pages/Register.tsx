import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import useAppSelector from '../hooks/useAppSelecter';
import useAppDispatch from '../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createSingleUser } from '../redux/reducers/UserReducer';
import { User } from '../types/User';
import axios from 'axios';


export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [status, setStatus] = useState('');
  const [occupation, setOccupation] = useState('');
  const [imageSender, setImageSender] = useState('');
  const [skills, setSkills] = useState([])
  const [errorMessage, setErrorMessage] = useState('');
  const { user, users } = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const defaultTheme = createTheme();

  useEffect(() => {
  }, []);

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.files?.[0];
    if (file) {  
      formData.append('file', file); // Append the file to the FormData
    }
    formData.append("upload_preset", "ade40fld");
    console.log("I am here");
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dv4j8hjqf/image/upload", formData);
      setImageSender(response.data.public_id);
      //console.log(response.data.public_id);
      //await second(); // Assuming second() is an asynchronous function
      console.log(imageSender);
      //console.log('I am here');
    } catch (error) {
      console.log("Error occurred during user registration:", error);
      console.log("upload error");
    }
    //second()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let emailAvailable: User[] = users.filter(u => u.email === email);
    if (emailAvailable.length === 0) {
      if (firstName === '' || email === '' || password === '' || rePassword === '') {
        setErrorMessage('Please check all input');
      }
      else if (email.includes('@') === false || email.includes('.') === false) {
        setErrorMessage('Email format is wrong');
      }
      else if (password.length<8 && rePassword.length<8) {
        setErrorMessage('Password must be 8 charecters or long');
      }
      else if (password !== rePassword) {
        setErrorMessage('Password did not match');
      }
      else {
        dispatch(createSingleUser({ userData: { firstName: firstName, lastName: lastName, email: email, password: password, status: status, occupation: occupation, imageSender: imageSender , skills: skills} }));
        navigate('/');
      }
    }
    else {
      setErrorMessage('This email is already registered !');
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="first name"
                autoFocus
                onChange={e => setFirstName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="last name"
                autoFocus
                onChange={e => setLastName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setEmail(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="status"
                name="status"
                required
                fullWidth
                id="status"
                label="status"
                autoFocus
                onChange={e => setStatus(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="occuption"
                name="occuption"
                required
                fullWidth
                id="occuption"
                label="occuption"
                autoFocus
                onChange={e => setOccupation(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={e => setPassword(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="repassword"
                label="Re-Password"
                type="password"
                id="repassword"
                onChange={e => setRePassword(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <label>Avater </label>
              <input
                required
                name="avater"
                type="file"
                id="avater"
                accept="image/*"
                onChange={handleImageUpload} />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email." />
            </Grid>
          </Grid>
          <p style={{ color: 'red' }}>{errorMessage}</p>
          <Button
             type="submit"
             fullWidth
             variant="contained"
             sx={{ mt: 3, mb: 2  }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login"><p>Already have account? Login</p></Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Container>
    </ThemeProvider>
  );
}
