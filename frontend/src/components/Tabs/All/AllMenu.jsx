import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Grid } from '@material-ui/core';


const useStyles = theme => ({
    rootDiv: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        fontSize: "x-large"
    },
    });





function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }


class AllMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {index : 0};
    }

    handleChangeIndex = (event, newValue) => {
        this.setState({index: newValue});
    };


    render (){
        const {classes, menuData} = this.props;
        return (
          <div className={classes.rootDiv}>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.index}
                onChange={this.handleChangeIndex}
                indicatorColor="primary"
                textColor="primary"
                scrollButtons="auto"
                centered
              >
                {menuData.map((menus) => (
                  <Tab label={menus.category} {...a11yProps(menus.id)} />
                ))}
              </Tabs>
            </AppBar>
            {menuData.map((menus) => (
              <TabPanel value={this.state.index} index={menus.id}>

                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <GridList
                      spacing={1}
                      cellWidth={400}
                      cellHeight={300}
                      cols={3}
                    >
                      {menus.menu.map((tile) => (
                        <GridListTile key={tile.image} onClick={this.props.onAdd.bind(this, tile.id, tile.name, tile.price)}> 
                          <img src={tile.image} alt={tile.name} />
                          <GridListTileBar
                            title={tile.name + "  " + tile.price + "원"}
                            classes={{
                              root: classes.titleBar,
                            }}
                          />
                        </GridListTile>
                      ))}
                    </GridList>
                  </Grid>
                </Grid>
              </TabPanel>
            ))}
          </div>
        );
    }
}


// export default AllMenu;
export default withStyles(useStyles)(AllMenu)
