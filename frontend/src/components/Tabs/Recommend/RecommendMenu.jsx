import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


import { Grid } from '@material-ui/core';

const useStyles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
        overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
    //   background:
    //     'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    titleTopBar: {
        background:
          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});




class RecommendMenu extends React.Component {
    render() {
        const {classes, menuData, recommendInfo} = this.props;
        const base_url = '/public/coffee_ori/';

        console.log("recommendInfo : ", recommendInfo);
        return (
          <div className={classes.root}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <GridList className={useStyles.gridList} cols={2} spacing={1} cellHeight={400}>
                  {recommendInfo.map((tile) => (
                    <GridListTile key={base_url+tile.name+'.jpg'} cols={1}
                    onClick={this.props.onAdd.bind(this, tile.id, tile.name, tile.price)}>
                        {/* <div style={{borderRadius: '20px'}}> */}
                        <img src={base_url+tile.name+'.jpg'} alt={tile.name} />
                        {/* </div> */}
                    {/* <GridListTileBar
                        title={'주문 날짜 : '+tile.date}
                        titlePosition="top"
                        className={classes.titleTopBar}
                        /> */}
                      <GridListTileBar
                        titlePosition="bottom"
                        title={tile.name + "  " + tile.price + "원"}
                        className={classes.titleBar}
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </Grid>
            </Grid>
          </div>
        );
    }
}
export default withStyles(useStyles)(RecommendMenu)
