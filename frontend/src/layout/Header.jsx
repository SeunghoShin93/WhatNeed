import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import SC_Logo from '../assets/images/Cafe.png';
import Button from '@material-ui/core/Button';

const Header = () => {
    
    return (
        <AppBar position='relative' style={{ backgroundColor: '#003c61'}}>
            <img src={SC_Logo} alt="싸피 로고" style={{ margin: 'auto auto', width:'128px', height: '128px'}} />
            <Button variant="outlined" size="large" style={{ position: 'absolute', color: 'white', marginLeft: '10px', marginTop: '20px' }}> <b> 나가기 </b> </Button>
        </AppBar>
    )
} 


export default Header;