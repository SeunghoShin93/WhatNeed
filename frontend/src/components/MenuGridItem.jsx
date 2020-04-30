import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';

class MenuGridItem extends React.Component {

    handleClick = (e) => {
        console.log(this.props.name)
    }

    render() {
        return (
            <div onClick={this.handleClick}>
             <Menu name={this.props.name} price={this.props.price} image={this.props.image} index={this.props.index} />                
            </div>
        )
    }
}

class Menu extends React.Component {

    render() {
        return(
            <Box border={2} borderColor="grey.500"  borderRadius={16} style={{ margin: '20px' }}>
                <ButtonBase >
            <Grid item sm style={{padding:' 20px 50px'}}>
                    <img src={this.props.image} alt="menu_img" style={{margin: 'auto',
    display: 'block', width: '128px', height: '128px',}}/>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    {this.props.name}
                </Typography>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    {this.props.price} 원
                </Typography>
            </Grid>
            </ButtonBase>
            </Box>
         
        )
    }
}

export default MenuGridItem;