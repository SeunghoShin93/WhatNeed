import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SwipeableViews from "react-swipeable-views";
import FavoriteMenu from "../components/Tabs/Favorite/FavoriteMenu";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AllMenu from '../components/Tabs/All/AllMenu';
import RecentMenu from '../components/Tabs/Recent/RecentMenu';
import update from 'react-addons-update';
import RecommendMenu from "../components/Tabs/Recommend/RecommendMenu";

import store from "../store";

const useStyles = makeStyles((theme) => ({
  root:{
    marginLeft : "50px"
  },
  table: {
    height: "55%",
    maxHeight: "500px",
    minHeight: "200px",
  },
  row: {
    height: "33%",
  },

  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


const styles = {
  tabs: {
    background: "#fff",
  },
  slide1: {
    padding: 15,
    color: "#fff",
  },
  slide2: {
    padding: 15,
    color: "#fff",
  },
  slide3: {
    padding: 15,
    color: "#fff",
  },
};

function ccyFormat(num) {
  return `${num.toFixed(0)}`;
}


function createRow(id, name, cnt, price) {
  return { id : id, name : name, count: cnt,  price : price };
}

function subtotal(items) {
  var totalprice = 0;
  items.forEach(element => {
    totalprice += element.price;
  });
  return totalprice;
}

const menuData = [
  {
      id : 0,
      category : '브루드 커피',
      menu : [
        {id : 1, name : '아이스 커피', price : 3000, image: '/coffee/브루드 커피/아이스 커피.jpg'},
        {id : 2, name : '오늘의 커피', price : 3800, image: '/coffee/브루드 커피/오늘의 커피.jpg'},
    ],
  },
  {
      id : 1,
      category : '블렌디드',
      menu : [
          {id : 3, name : '딸기 요거트 블렌디드', price : 4000, image: '/coffee/블렌디드/딸기 요거트 블렌디드.jpg'},
          {id : 4, name : '망고 바나나 블렌디드', price : 4000, image: '/coffee/블렌디드/망고 바나나 블렌디드.jpg'},
          {id : 5, name : '망고 패션 후르츠 블렌디드', price : 5000, image: '/coffee/블렌디드/망고 패션 후르츠 블렌디드.jpg'},
          {id : 6, name : '익스트림 티 블렌디드', price : 4000, image: '/coffee/블렌디드/익스트림 티 블렌디드.jpg'},
          {id : 7, name : '자몽 셔벗 블렌디드', price : 4000, image: '/coffee/블렌디드/자몽 셔벗 블렌디드.jpg'},
          {id : 9, name : '제주 레드 빈 블렌디드', price : 5000, image: '/coffee/블렌디드/제주 레드 빈 블렌디드.jpg'},
          {id : 8, name : '제주 한라봉 블랙 티 블렌디드', price : 5000, image: '/coffee/블렌디드/제주 한라봉 블랙 티 블렌디드.jpg'},
        ],
  },
  {
      id : 2,
      category : '에스프레소',
      menu : [
          {id : 10, name : '라벤더 카페 브레베', price : 4000, image: '/coffee/에스프레소/라벤더 카페 브레베.jpg'},
          {id : 11, name : '럼 샷 코르타도', price : 6000, image: '/coffee/에스프레소/럼 샷 코르타도.jpg'},
          {id : 12, name : '바닐라 스타벅스 더블 샷', price : 7000, image: '/coffee/에스프레소/바닐라 스타벅스 더블 샷.jpg'},
          {id : 13, name : '바닐라 플랫 화이트', price : 5000, image: '/coffee/에스프레소/바닐라 플랫 화이트.jpg'},
          {id : 14, name : '스타벅스 돌체 라떼', price : 5000, image: '/coffee/에스프레소/스타벅스 돌체 라떼.jpg'},
          {id : 15, name : '블론드 리스트레토 마키아또', price : 6000, image: '/coffee/에스프레소/블론드 리스트레토 마키아또.jpg'},
          {id : 16, name : '블론드 에스프레소 토닉', price : 5000, image: '/coffee/에스프레소/블론드 에스프레소 토닉.jpg'},
          {id : 17, name : '블론드 카라멜 클라우드 마키아또', price : 6000, image: '/coffee/에스프레소/블론드 카라멜 클라우드 마키아또.jpg'},
          {id : 18, name : '블론드 코코아 클라우드 마키아또', price : 6000, image: '/coffee/에스프레소/블론드 코코아 클라우드 마키아또.jpg'},
        ],
  },
  {
      id : 3,
      category : '콜드 브루 커피',
      menu : [
          {id : 61, name : '나이트로 바닐라 크림', price : 4000, image: '/coffee/콜드 브루 커피/나이트로 바닐라 크림.jpg'},
          {id : 62, name : '나이트로 쇼콜라 클라우드', price : 5000, image: '/coffee/콜드 브루 커피/나이트로 쇼콜라 클라우드.jpg'},
          {id : 63, name : '나이트로 콜드 브루', price : 8000, image: '/coffee/콜드 브루 커피/나이트로 콜드 브루.jpg'},
          {id : 64, name : '돌체 콜드 브루', price : 7000, image: '/coffee/콜드 브루 커피/돌체 콜드 브루.jpg'},
          {id : 65, name : '바닐라 크림 콜드 브루', price : 5000, image: '/coffee/콜드 브루 커피/바닐라 크림 콜드 브루.jpg'},
          {id : 66, name : '제주 비자림 콜드 브루', price : 4000, image: '/coffee/콜드 브루 커피/제주 비자림 콜드 브루.jpg'}, 
          {id : 67, name : '코코넛 화이트 콜드 브루', price : 6000, image: '/coffee/콜드 브루 커피/코코넛 화이트 콜드 브루.jpg'}, 
          {id : 68, name : '콜드 브루 몰트', price : 5000, image: '/coffee/콜드 브루 커피/콜드 브루 몰트.jpg'}, 
          {id : 69, name : '콜드 브루 플로트', price : 6000, image: '/coffee/콜드 브루 커피/콜드 브루 플로트.jpg'} 
        ],
  },
  {
    id : 4,
    category : '티',
    menu : [
        {id : 72, name : '그랜마 애플 블랙 밀크 티', price : 4000, image: '/coffee/티/그랜마 애플 블랙 밀크 티.jpg'},
        {id : 73, name : '그랜마 애플 블랙 티', price : 5000, image: '/coffee/티/그랜마 애플 블랙 티.jpg'},
        {id : 74, name : '돌체 블랙 밀크 티', price : 8000, image: '/coffee/티/돌체 블랙 밀크 티.jpg'},
        {id : 75, name : '라임 패션 티', price : 7000, image: '/coffee/티/라임 패션 티.jpg'},
        {id : 76, name : '말차 레모네이드 프로즌 티', price : 5000, image: '/coffee/티/말차 레모네이드 프로즌 티.jpg'},
        {id : 77, name : '민트 블렌드 티', price : 4000, image: '/coffee/티/민트 블렌드 티.jpg'}, 
        {id : 78, name : '아이스 그랜마 애플 블랙 밀크 티', price : 6000, image: '/coffee/티/아이스 그랜마 애플 블랙 밀크 티.jpg'}, 
        {id : 79, name : '아이스 그랜마 애플 블랙 티', price : 5000, image: '/coffee/티/아이스 그랜마 애플 블랙 티.jpg'}, 
        {id : 80, name : '아이스 돌체 블랙 밀크 티', price : 6000, image: '/coffee/티/아이스 돌체 블랙 밀크 티.jpg'} 
      ],
  },
  {
    id : 5,
    category : '프라푸치노',
    menu : [
        {id : 44, name : '모카 프라푸치노', price : 4000, image: '/coffee/프라푸치노/모카 프라푸치노.jpg'},
        {id : 45, name : '바닐라 크림 프라푸치노', price : 5000, image: '/coffee/프라푸치노/바닐라 크림 프라푸치노.jpg'},
        {id : 46, name : '블랙 와플칩 크림 프라푸치노', price : 8000, image: '/coffee/프라푸치노/블랙 와플칩 크림 프라푸치노.jpg'},
        {id : 47, name : '에스프레소 프라푸치노', price : 7000, image: '/coffee/프라푸치노/에스프레소 프라푸치노.jpg'},
        {id : 48, name : '이천 햅쌀 크림 프라푸치노', price : 5000, image: '/coffee/프라푸치노/이천 햅쌀 크림 프라푸치노.jpg'},
        {id : 49, name : '이천 햅쌀 크림 프라푸치노', price : 4000, image: '/coffee/프라푸치노/이천 햅쌀 크림 프라푸치노.jpg'}, 
        {id : 50, name : '자바 칩 프라푸치노', price : 6000, image: '/coffee/프라푸치노/자바 칩 프라푸치노.jpg'}, 
        {id : 51, name : '제주 까망 크림 프라푸치노', price : 5000, image: '/coffee/프라푸치노/제주 까망 크림 프라푸치노.jpg'}, 
        {id : 52, name : '제주 쑥떡 크림 프라푸치노', price : 6000, image: '/coffee/프라푸치노/제주 쑥떡 크림 프라푸치노.jpg'} 
      ],
  }
]

const SpanningTable= props => {
  const classes = useStyles();
  const [show, setShow] = React.useState(true);

  const handleClick = () => {
    setShow(!show);
    console.log(show);
  };

  return (
      <div className={classes.root}>
    <Fab color="secondary" aria-label="cart" style={{ position: 'sticky', zIndex: '1000',  marginTop: show ? '-10px' : '200px',marginLeft: '800px', transition: '.25s'}}>
      <ShoppingCartIcon onClick={handleClick} />
    </Fab>
      <TableContainer component={Paper} style={{ maxHeight:'300px' ,width:'80%', position: 'fixed', bottom: '135px', marginLeft: '50px', zIndex: '999', visibility: show ? '' : 'hidden' }}>
      <div >
    </div>
        <Box border={2}  borderRadius={16}>
      <Table className={classes.table}  aria-label="sticky table" >
        <TableHead>
          <TableRow>
            <TableCell>품목</TableCell>
            <TableCell align="right">수량</TableCell>
            <TableCell align="right">가격</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cart.map((item) => (
            <TableRow key={item.name} className={classes.row}>
              <TableCell>{item.name}</TableCell>
              <TableCell align="right"> 
                <Button onClick={props.onAddItem.bind(this, item.id, item.name, item.count, item.price)}>+</Button>
              {item.count} 개
                <Button onClick={props.onReduce.bind(this, item.id, item.name, item.count, item.price)}>-</Button>
              </TableCell>
              {/* <TableCell align="right">{item.unit}</TableCell> */}
              <TableCell align="right">{ccyFormat(item.price)} 원
              <Button onClick={props.onRemove.bind(this, item.id)}>X</Button>
              
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}>합 계</TableCell>
            <TableCell align="right">{subtotal(props.cart)} 원</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    <Button variant="contained" color="secondary" size="large" style={{ marginLeft: '30px'}} onClick={props.onPurchase} >
              <b>결 제 </b>
          </Button>
      <Button variant="contained" size="large" style={{ marginLeft: '30px'}} onClick={props.onReset} >비 우 기</Button>
    </Box>
    </TableContainer>
    </div>
  );
}



class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 , cart: []};
  }

  handleChangeNav = (event, value) => {
    this.setState({ index: value });
  };

  handleChangeIndex = (value) => {
    this.setState({ index: value });
  };

  handleAdd = (id, name, price,  e) => {
    var targetIndex = -1;
    if(this.state.cart.length !== 0){
      for(var i=0; i<this.state.cart.length; i++){
        if (id === this.state.cart[i].id) {
          targetIndex = i;
          break;
        }
      }
    }

    if(targetIndex !== -1){
      const { cart } = this.state;
      this.setState({
        cart: cart.map(
          item => id === item.id
          ? createRow(id, name, item.count+1, item.price+price)
          : item)})
    }else{
      this.setState({
        cart: this.state.cart.concat(createRow(id, name, 1, price)),
      });
    }

    console.log("id : ", id, " name : ", name, " price : ", price);
    console.log(this.state.cart);
  }

  handleRemove = (id) => {
    const { cart } = this.state;
    this.setState({
      cart : cart.filter(item => item.id !== id)
    })
  }

  handleAddCount = (id, name, count, price) => {
    const { cart } = this.state;
    this.setState({
      cart: cart.map(
        item => id === item.id
        ? createRow(id, name, item.count+1, item.price+price)
        : item)})
  }

  handleReduceCount = (id, name, count, price) => {
    const { cart } = this.state;
    var targetIndex = -1;
    for(var i=0; i<this.state.cart.length; i++){
      if(this.state.cart[i].id === id){
        targetIndex = i;
        break;
      }
    }
  
    if(this.state.cart[targetIndex].count === 1){
      this.handleRemove(id);
    }else{
      this.setState({
        cart: cart.map(
          item => id === item.id
          ? createRow(id, name, item.count-1, item.price-(item.price/item.count))
          : item)})
    }
  }


  handlePurchase = () => {
    console.log(this.state.cart);
  }

  handleReset = () => {
    this.setState({cart: []});
  }

  render() {
    const {userInfo, setUserInfo} = store.getState().userInfo;
    const {items, setItmes} = store.getState().items;
    const { index, cart } = this.state;

    //alert(store.getState().userInfo);
    //console.log("누고?");
    return (
        <div
        position="relative"
        style={{ marginTop: "50px", marginBottom: "100px", minHeight: "500px" }}
        >
        <Typography
          style={{ fontWeight: "400", fontSize: "large", marginBottom: "20px" }}
          >
          환영합니다, 'user' 님
        </Typography>

        {
            console.log(this.state.items)}

            {console.log(this.state.userInfo)
        }

        <div>
          <BottomNavigation
            value={this.state.index}
            onChange={this.handleChangeNav}
            showLabels
          >
            <BottomNavigationAction label="추천 메뉴" />
            <BottomNavigationAction label="최근 먹은 메뉴" />
            <BottomNavigationAction label="자주 먹은 메뉴" />
            <BottomNavigationAction label="전체 메뉴" />
          </BottomNavigation>
        </div>

        <SwipeableViews
          index={this.state.index}
          onChangeIndex={this.handleChangeIndex}
        >
          <div style={Object.assign({}, styles.slide1)}>
            <RecommendMenu menuData={menuData} onAdd={this.handleAdd}/>
          </div>
          <div style={Object.assign({}, styles.slide2)}>
            <RecentMenu menuData={menuData} onAdd={this.handleAdd}/>
          </div>
          <div style={Object.assign({}, styles.slide3)}>
            <FavoriteMenu menuData={menuData} onAdd={this.handleAdd}/>
          </div>
          <div style={Object.assign({}, styles.slide4)}>
            <AllMenu menuData={menuData} onAdd={this.handleAdd} />
          </div>
        </SwipeableViews>
        <SpanningTable cart={cart} style={{ position: 'sticky', zIndex: '999'}} 
          onPurchase={this.handlePurchase} 
          onReset={this.handleReset} 
          onRemove={this.handleRemove} 
          onReduce={this.handleReduceCount} 
          onAddItem={this.handleAddCount} 
        />
      </div>
    );
  }
}

export default Layout;
