import React from 'react';
import ChartList from './ChartList'
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
      // background:
      //   'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    titleTopBar: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});


class FavoriteMenu extends React.Component {
    render() {
      const {classes, menuData, favoriteInfo} = this.props;
      const base_url = '/public/coffee_ori/';
      const resultTile = favoriteInfo.slice(0,3);
        return (
          <div className={classes.root}>
            <Grid container spacing={1}>
            <Grid item xs={1} />
              <Grid item xs={5}>
                <GridList className={useStyles.gridList} cols={1} spacing={1} cellWidth={400} cellHeight={300}>
                  {resultTile.map((tile) => (
                    <GridListTile key={base_url+tile.name+'.jpg'} cols={1} 
                      onClick={this.props.onAdd.bind(this, tile.id, tile.name, tile.price)}>
                        <img src={base_url+tile.name+'.jpg'} alt={tile.name} />
                        <GridListTileBar
                        title={'주문 횟수 : '+tile.count}
                        titlePosition="top"
                        className={classes.titleTopBar}
                        />
                      <GridListTileBar
                        title={tile.name + "  " + tile.price + "원"}
                        classes={{
                          root: classes.titleBar,
                          // title: classes.title,
                        }}
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={5} >
                <div style={{marginTop : '150px'}}>
                    <ChartList favoriteInfo = {favoriteInfo}></ChartList>
                </div>
              </Grid>
            </Grid>
          </div>
        );
    }
}

export default withStyles(useStyles)(FavoriteMenu)
