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
    },
    });

const userData = [
    {id : 0, name : '나이트로 바닐라 크림', price : 4000, count : 2},
    {id : 1, name : '돌체 콜드 브루', price : 5000, count : 1},
    {id : 2, name : '제주 비자림 콜드 브루', price : 8000, count : 6},
    {id : 3, name : '코코넛 화이트 콜드 브루', price : 7000, count : 4},
    {id : 4, name : '콜드 브루', price : 2000, count : 0}
]

const categoryData = [
    {id : 0, name : '블렌디드'},
    {id : 1, name : '에스프레소'},
    {id : 2, name : '콜드 브루 커피'},
    {id : 3, name : '티'},
    {id : 4, name : '프라푸치노'},
]

const purchaseInfo = [{
    user_id : 2,
    menu_info : [
        {
            id : 2,
            count : 3
        },
        {
            id : 1,
            count : 4
        },
        {
            id : 5,
            count : 1
        },
    ]
}]

// const menuData = [
//     {
//         id : 0,
//         category : '블렌디드',
//         menu : [
//             {id : 0, name : '딸기 요거트 블렌디드', price : 4000, image: '/coffee/블렌디드/딸기 요거트 블렌디드.jpg'},
//             {id : 1, name : '망고 바나나 블렌디드', price : 5000, image: '/coffee/블렌디드/망고 바나나 블렌디드.jpg'},
//       ],
//     },
//     {
//         id : 1,
//         category : '에스프레소',
//         menu : [
//             {id : 2, name : '나이트로 바닐라 크림', price : 4000, image: '/coffee/콜드 브루 커피/나이트로 바닐라 크림.jpg'},
//             {id : 3, name : '돌체 콜드 브루', price : 5000, image: '/coffee/콜드 브루 커피/돌체 콜드 브루.jpg'},
//             {id : 4, name : '제주 비자림 콜드 브루', price : 8000, image: '/coffee/콜드 브루 커피/제주 비자림 콜드 브루.jpg'},
//             {id : 5, name : '코코넛 화이트 콜드 브루', price : 7000, image: '/coffee/콜드 브루 커피/코코넛 화이트 콜드 브루.jpg'},
//             {id : 6, name : '콜드 브루', price : 2000, image: '/coffee/콜드 브루 커피/콜드 브루.jpg'}
//         ],
//     },
//     {
//         id : 2,
//         category : '콜드 브루 커피',
//         menu : [
//             {id : 2, name : '나이트로 바닐라 크림', price : 4000, image: '/coffee/콜드 브루 커피/나이트로 바닐라 크림.jpg'},
//             {id : 3, name : '돌체 콜드 브루', price : 5000, image: '/coffee/콜드 브루 커피/돌체 콜드 브루.jpg'},
//             {id : 4, name : '제주 비자림 콜드 브루', price : 8000, image: '/coffee/콜드 브루 커피/제주 비자림 콜드 브루.jpg'},
//             {id : 5, name : '코코넛 화이트 콜드 브루', price : 7000, image: '/coffee/콜드 브루 커피/코코넛 화이트 콜드 브루.jpg'},
//             {id : 6, name : '콜드 브루', price : 2000, image: '/coffee/콜드 브루 커피/콜드 브루.jpg'} 
//         ],
//     }
// ]

// const tileData = [
//     {name : '제주 비자림 콜드 브루', price : 8000, image: img03},
//     {name : '코코넛 화이트 콜드 브루', price : 7000, image: img04}
// ]

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

    onClickMenu = (clickMenuId, name, price, event) => {
        console.log('클릭된 음식 1번인자 : ', clickMenuId);
        console.log('클릭된 음식 2번인자 : ', name);
        console.log('클릭된 음식 3번인자 : ', price);
        console.log('클릭된 음식 4번인자 : ', event);
    }

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
