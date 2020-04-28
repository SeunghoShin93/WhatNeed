import React from 'react';
import Appbar from '@material-ui/core/AppBar';
import What_need_logo from '../assets/images/What_need_logo.png';



class Footer extends React.Component {
    render () {
      return(
        <Appbar position="fixed" style={{  zIndex: 'auto', backgroundColor: 'white',  top: "auto",
        bottom: 0,}}>
            
            <img src={What_need_logo} alt="왓니로고" style={{ width: '128px', height: '128px', marginLeft: 'auto' }} />
        </Appbar>
      )
  }
}

export default Footer;
