import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';

import Login from '../pages/Login';
import { Link } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelecter';
import { useEffect } from 'react';
import { authenticate } from '../redux/reducers/UserReducer'
import { getCVByEmail } from '../redux/reducers/UserCVReducer';
import logo from '../demoImages/logo.png';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

export default function NavBar({ check, change }: { check: any; change: any }) {
    const dispatch = useAppDispatch()
    const { user, checkemail, loading, error } = useAppSelector(state => state.userReducer)
    const token: any = localStorage.getItem("token" || "")
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(authenticate())
        dispatch(getCVByEmail({ email: user?.email }))
    }, [])
    const logout = () => {
        localStorage.setItem("token", "")
        navigate('/login')
    }
  
    return (
        <Box sx={{ flexGrow: 1, position: 'fixed', top: 0, width: '100%' }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "primary.contrastText", fontFamily: 'Nico Moji' }}> */}
                        <Link to="/"><img src={logo} alt="" style={{height: "60px", width: "170px", marginTop: "5px"}}/></Link>
                    {/* </Typography> */}
                    <div className='actions' style={{
                         marginLeft: 'auto', 
                         marginRight: '30%' , 
                         display: "flex",
                         flexDirection: "row",
                         gap: "30px"
                         }}>
                        <Link to="/others">People</Link>
                        <Link to="/others">People</Link>
                        <Link to="/others">People</Link>
                    </div>
                    {token ?
                        <div style={{ display: 'flex', gap: 10 }}>
                            <Link to='/profile'><p style={{ color: "primary.contrastText" }}>{user?.first_name}</p></Link>
                            <Button
                                sx={{ backgroundColor: "primary.contrastText", margin: 1 }} onClick={logout}>Logout</Button>
                        </div>
                        :
                        <div style={{ display: 'flex', gap: 10 }}>
                            <Link to="/login"><Typography sx={{ flexGrow: 1, color: "primary.contrastText", fontFamily: 'Nico Moji', textDecoration: 'none' }}>
                                Login
                            </Typography></Link>
                            <Link to="/register"><Typography sx={{ flexGrow: 1, color: "primary.contrastText", fontFamily: 'Nico Moji', textDecoration: 'none' }}>
                                Register
                            </Typography></Link>
                        </div>
                    }
                    {<MaterialUISwitch sx={{ m: 1 }} defaultChecked checked={check}
                        onChange={change} />}
                </Toolbar>
            </AppBar>
        </Box>
    );
}