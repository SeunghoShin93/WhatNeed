import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import SC_Logo from '../assets/images/Cafe.png';
import Button from '@material-ui/core/Button';
import { Redirect, useHistory, Link } from "react-router-dom";

const Header = () => {
    let history = useHistory();
    const goHome = () => {
        history.push('/');
        window.location.reload();
    }
    return (
        <AppBar position='relative' style={{ backgroundColor: '#003c61'}}>
            <img src={SC_Logo} alt="싸피 로고" style={{ margin: 'auto auto', width:'128px', height: '128px'}} />
            
            <Button onClick={goHome} variant="outlined" size="large" style={{ position: 'absolute', color: 'white', marginLeft: '10px', marginTop: '20px' }}> <b> 나가기 </b> </Button>
        </AppBar>
    )
} 


export default Header;