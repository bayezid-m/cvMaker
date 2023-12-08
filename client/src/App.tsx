import React, { useState } from 'react';
import { Route, Routes, BrowserRouter, } from 'react-router-dom'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from '@mui/material';

import './App.css';
import NavBar from './components/NavBar';
import DashBoar from './pages/DashBoar';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import Jobs from './pages/Jobs';
import Events from './pages/Events';
import CvMaking from './pages/CvMaking'

function App() {
  const [isDark, setIsDark] = useState(false)

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: "#0437F2",
        contrastText: "#F0FFFF",
      },
      secondary: {
        main: "#424242",
      },
      success: {
        main: "#5c6bc0",
        contrastText: '#311b92',
      },
    }
  })
  const lightTheme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: "#F0FFFF",
        contrastText: "#0437F2"
      },
      secondary: {
        main: "#eceff1",
      },
      success: {
        main: "#bbdefb",
        contrastText: '#3f51b5',
      },
    }
  })

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Paper sx={{ maxHeight: "100%", paddingTop: "40px", minHeight: 900, backgroundColor: "secondary.main" }}>
        <BrowserRouter>
          <NavBar check={isDark} change={() => setIsDark(!isDark)} />
          <Routes>
            <Route path='/' element={<DashBoar />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/userCV' element={<CvMaking/>}/> 
          </Routes>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
