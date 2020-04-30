import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Footer from "../layout/Footer"
import correct from "../assets/images/correct.png"

const useStyles = theme => ({
    root:{
        marginTop: '50%',
        paddingBottom: '50%'
    },
    rootDiv: {
      textAlign: 'center',
      border: '5px solid #1E90FF',
      borderRadius: '16px',
      margin: '50px auto ',
      width: '80%',
    },
    resultText : {
        textAlign: 'center'
    },
    resultImage : {
        textAlign: 'center',
        marginTop: '50px',

    },
    button: {
      marginTop: '50px',
      paddingBottom: '100px'
    },
    check: {
      width: '128px',
      height: '128px',
    }


})

class OrderResult extends React.Component {
    render(){
        const {classes} = this.props;
        return (
          <Fragment>
          <div className={classes.rootDiv}>
            <div className={classes.root}>
              <Typography className={classes.resultText} variant="h1" component="h1" gutterBottom>
                <b>결제가 완료되었습니다!</b>
              </Typography>
              
            <div className={classes.resultImage}>
              <img src={correct} alt="" className={classes.check} />
            </div>
            <div className={classes.button}>
              <Button size="large" variant="contained" color="primary" >
                <Link to="/" style={{textDecoration : "none", color: 'white'}}>확 인</Link>
            </Button> 
            </div>
          </div>
            </div>
          <Footer />
          </Fragment>
        );
    };
}


export default withStyles(useStyles)(OrderResult)
