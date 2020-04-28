import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import img01 from '../../../assets/images/coffee/콜드 브루 커피/나이트로 바닐라 크림.jpg';
import img02 from '../../../assets/images/coffee/콜드 브루 커피/돌체 콜드 브루.jpg';
import img03 from '../../../assets/images/coffee/콜드 브루 커피/제주 비자림 콜드 브루.jpg';
import img04 from '../../../assets/images/coffee/콜드 브루 커피/코코넛 화이트 콜드 브루.jpg';
import img05 from '../../../assets/images/coffee/콜드 브루 커피/콜드 브루.jpg';

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

const userData = [
    {id : 0, name : '나이트로 바닐라 크림', price : 4000, date : '200421'},
    {id : 1, name : '돌체 콜드 브루', price : 5000, date : '190421'},
    {id : 2, name : '제주 비자림 콜드 브루', price : 8000, date : '200321'},
    {id : 3, name : '코코넛 화이트 콜드 브루', price : 7000, date : '200111'},
    {id : 4, name : '콜드 브루', price : 2000, date : '200422'}
]

const menuData = [
    {id : 0, name : '나이트로 바닐라 크림', price : 4000, image: img01},
    {id : 1, name : '돌체 콜드 브루', price : 5000, image: img02},
    {id : 2, name : '제주 비자림 콜드 브루', price : 8000, image: img03},
    {id : 3, name : '코코넛 화이트 콜드 브루', price : 7000, image: img04},
    {id : 4, name : '콜드 브루', price : 2000, image: img05}
]

const tileData = [
    {id : 0, name : '나이트로 바닐라 크림', price : 8000, image: img01, date : '20/04/21'},
    {id : 1, name : '돌체 콜드 브루', price : 7000, image: img02,  date : '20/05/20'},
    {id : 3, name : '코코넛 화이트 콜드 브루', price : 7000, image: img04,  date : '20/03/19'},
    {id : 4, name : '콜드 브루', price : 2000, image: img05,  date : '20/02/01'}
]



class RecentMenu extends React.Component {
    // classes = useStyles();
    render() {
        const {classes} = this.props;
        return (
          <div className={classes.root}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <GridList className={useStyles.gridList} cols={2} spacing={1} cellHeight={400}>
                  {tileData.map((tile) => (
                    <GridListTile key={tile.image} cols={1}
                    onClick={this.props.onAdd.bind(this, tile.id, tile.name, tile.price)}>
                        {/* <div style={{borderRadius: '20px'}}> */}
                        <img src={tile.image} alt={tile.name} />
                        {/* </div> */}
                    <GridListTileBar
                        title={'주문 날짜 : '+tile.date}
                        titlePosition="top"
                        className={classes.titleTopBar}
                        />
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
export default withStyles(useStyles)(RecentMenu)
