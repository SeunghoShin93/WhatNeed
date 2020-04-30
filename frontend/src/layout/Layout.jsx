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
import RecommendMenu from "../components/Tabs/Recommend/RecommendMenu";
import { Redirect,useHistory, Link } from "react-router-dom";
import Modal from "react-modal";
import axios, { post } from 'axios';
import store from '../store';


const useStyles = makeStyles((theme) => ({
  text: {
    fontSize : "large"
  },
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
  hasUserComment : {
    textAlign: "center", fontWeight: "400", fontSize: "xx-large", marginBottom: "20px"
  },
  noUserComment : {
    display :"none"
  },

  hasUser : {

  },
  noUser : {
    display : "none"
  },

  tabfont :{
    fontSize : "large"
  },

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

// let userInfo = store.getState().userInfo;
// let itemsInfo = store.getState().items;


const menuData = [
  {
      id : 0,
      category : '브루드 커피',
      menu : [
        {id : 1, name : '아이스 커피', price : 3000, image: '/coffee_ori/아이스 커피.jpg'},
        {id : 2, name : '오늘의 커피', price : 3800, image: '/coffee_ori/오늘의 커피.jpg'},
    ],
  },
  {
      id : 1,
      category : '블렌디드',
      menu : [
          {id : 3, name : '딸기 요거트 블렌디드', price : 4000, image: '/coffee_ori/딸기 요거트 블렌디드.jpg'},
          {id : 4, name : '망고 바나나 블렌디드', price : 4000, image: '/coffee_ori/망고 바나나 블렌디드.jpg'},
          {id : 5, name : '망고 패션 후르츠 블렌디드', price : 5000, image: '/coffee_ori/망고 패션후르츠 블렌디드.jpg'},
          {id : 6, name : '익스트림 티 블렌디드', price : 4000, image: '/coffee_ori/익스트림 티 블렌디드.jpg'},
          {id : 7, name : '자몽 셔벗 블렌디드', price : 4000, image: '/coffee_ori/자몽 셔벗 블렌디드.jpg'},
          {id : 9, name : '제주 레드 빈 블렌디드', price : 5000, image: '/coffee_ori/제주 레드 빈 블렌디드.jpg'},
          {id : 8, name : '제주 한라봉 블랙 티 블렌디드', price : 5000, image: '/coffee_ori/제주 한라봉 블랙 티 블렌디드.jpg'},
        ],
  },
  {
      id : 2,
      category : '에스프레소',
      menu : [
          {id : 10, name : '라벤더 카페 브레베', price : 4000, image: '/coffee_ori/라벤더 카페 브레베.jpg'},
          {id : 11, name : '럼 샷 코르타도', price : 6000, image: '/coffee_ori/럼 샷 코르타도.jpg'},
          {id : 12, name : '바닐라 스타벅스 더블 샷', price : 7000, image: '/coffee_ori/바닐라 스타벅스 더블 샷.jpg'},
          {id : 13, name : '바닐라 플랫 화이트', price : 5000, image: '/coffee_ori/바닐라 플랫 화이트.jpg'},
          {id : 14, name : '스타벅스 돌체 라떼', price : 5000, image: '/coffee_ori/스타벅스 돌체 라떼.jpg'},
          {id : 15, name : '블론드 리스트레토 마키아또', price : 6000, image: '/coffee_ori/블론드 리스트레토 마키아또.jpg'},
          {id : 16, name : '블론드 에스프레소 토닉', price : 5000, image: '/coffee_ori/블론드 에스프레소 토닉.jpg'},
          {id : 17, name : '블론드 카라멜 클라우드 마키아또', price : 6000, image: '/coffee_ori/블론드 카라멜 클라우드 마키아또.jpg'},
          {id : 18, name : '블론드 코코아 클라우드 마키아또', price : 6000, image: '/coffee_ori/블론드 코코아 클라우드 마키아또.jpg'},
        ],
  },
  {
      id : 3,
      category : '콜드 브루 커피',
      menu : [
          {id : 27, name : '나이트로 바닐라 크림', price : 4000, image: '/coffee_ori/나이트로 바닐라 크림.jpg'},
          {id : 28, name : '나이트로 쇼콜라 클라우드', price : 5000, image: '/coffee_ori/나이트로 쇼콜라 클라우드.jpg'},
          {id : 29, name : '나이트로 콜드 브루', price : 8000, image: '/coffee_ori/나이트로 콜드 브루.jpg'},
          {id : 30, name : '돌체 콜드 브루', price : 7000, image: '/coffee_ori/돌체 콜드 브루.jpg'},
          {id : 31, name : '바닐라 크림 콜드 브루', price : 5000, image: '/coffee_ori/바닐라 크림 콜드 브루.jpg'},
          {id : 32, name : '제주 비자림 콜드 브루', price : 4000, image: '/coffee_ori/제주 비자림 콜드 브루.jpg'}, 
          {id : 33, name : '코코넛 화이트 콜드 브루', price : 6000, image: '/coffee_ori/코코넛 화이트 콜드 브루.jpg'}, 
          {id : 34, name : '콜드 브루 몰트', price : 5000, image: '/coffee_ori/콜드 브루 몰트.jpg'}, 
          {id : 35, name : '콜드 브루 플로트', price : 6000, image: '/coffee_ori/콜드 브루 플로트.jpg'} 
        ],
  },
  {
    id : 4,
    category : '티',
    menu : [
        {id : 36, name : '그랜마 애플 블랙 밀크 티', price : 4000, image: '/coffee_ori/그랜마 애플 블랙 밀크 티.jpg'},
        {id : 37, name : '그랜마 애플 블랙 티', price : 5000, image: '/coffee_ori/그랜마 애플 블랙 티.jpg'},
        {id : 38, name : '돌체 블랙 밀크 티', price : 8000, image: '/coffee_ori/돌체 블랙 밀크 티.jpg'},
        {id : 39, name : '라임 패션 티', price : 7000, image: '/coffee_ori/라임 패션 티.jpg'},
        {id : 40, name : '말차 레모네이드 프로즌 티', price : 5000, image: '/coffee_ori/말차 레모네이드 프로즌 티.jpg'},
        {id : 41, name : '민트 블렌드 티', price : 4000, image: '/coffee_ori/민트 블렌드 티.jpg'}, 
        {id : 42, name : '아이스 그랜마 애플 블랙 밀크 티', price : 6000, image: '/coffee_ori/아이스 그랜마 애플 블랙 밀크 티.jpg'}, 
        {id : 43, name : '아이스 그랜마 애플 블랙 티', price : 5000, image: '/coffee_ori/아이스 그랜마 애플 블랙 티.jpg'}, 
        {id : 44, name : '아이스 돌체 블랙 밀크 티', price : 6000, image: '/coffee_ori/아이스 돌체 블랙 밀크 티.jpg'} 
      ],
  },
  {
    id : 5,
    category : '프라푸치노',
    menu : [
        // {id : 44, name : '모카 프라푸치노', price : 4000, image: '/coffee/프라푸치노/모카 프라푸치노.jpg'},
        {id : 19, name : '바닐라 크림 프라푸치노', price : 5000, image: '/coffee_ori/바닐라 크림 프라푸치노.jpg'},
        {id : 20, name : '블랙 와플칩 크림 프라푸치노', price : 8000, image: '/coffee_ori/블랙 와플칩 크림 프라푸치노.jpg'},
        {id : 21, name : '에스프레소 프라푸치노', price : 7000, image: '/coffee_ori/에스프레소 프라푸치노.jpg'},
        {id : 22, name : '이천 햅쌀 크림 프라푸치노', price : 5000, image: '/coffee_ori/이천 햅쌀 크림 프라푸치노.jpg'},
        {id : 23, name : '이천 햅쌀 크림 프라푸치노', price : 4000, image: '/coffee_ori/이천 햅쌀 크림 프라푸치노.jpg'}, 
        {id : 24, name : '자바 칩 프라푸치노', price : 6000, image: '/coffee_ori/자바 칩 프라푸치노.jpg'}, 
        {id : 25, name : '제주 까망 크림 프라푸치노', price : 5000, image: '/coffee_ori/제주 까망 크림 프라푸치노.jpg'}, 
        {id : 26, name : '제주 쑥떡 크림 프라푸치노', price : 6000, image: '/coffee_ori/제주 쑥떡 크림 프라푸치노.jpg'} 
      ],
  }
]

const customStyles = {
  content : {
    zIndex                : '999',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const PurchaseButton = props => {
  const [modalIsOpen,setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  }
 
  const closeModal = () => {
    setIsOpen(false);
  }
 
  let history = useHistory();
  const purchase = () => {
    if(props.cart.length === 0){
      alert("결제할 상품이 없습니다.");
      closeModal();
      return;
    }

    if(store.getState().userInfo === undefined){
      history.push('/Result');
      return;
    }

    const url = 'http://52.79.161.164:8001/addOrderInfo/';
    const menu_info = [];

    for(var i=0; i<props.cart.length; i++){
      menu_info.push({menu_id : props.cart[i].id, count : props.cart[i].count});
    };

    const purchaseInfo = {
      user_id : store.getState().userInfo.id,
      menu_info : menu_info
    };

    const config = {
        headers: {
            'content-type': 'application/json'
        }
    };
    store.dispatch({type:'clear'});
    console.log("purchaseInfo", purchaseInfo);
    history.push('/Result');
    window.location.reload();
    return post(url, JSON.stringify(purchaseInfo),config);
  }
    return (
      <div>
        <Button variant="contained" color="secondary" size="large" style={{ marginLeft: '30px'}} onClick={openModal}>결 제</Button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 >결제하시겠습니까?</h2>

            <Button color="primary" onClick={purchase}> 
            {/* <Link to="/Result" style={{textDecoration : "none", color : "black"}}> */}
              예
              {/* </Link> */}
            </Button>
            <Button onClick={closeModal} style={{marginLeft: '60px'}}>아니오</Button>

        </Modal>
      </div>
    );
}



const SpanningTable= props => {
  const classes = useStyles();
  const [show, setShow] = React.useState(true);

  const handleClick = () => {
    setShow(!show);
    console.log(show);
  };

  return (
    <div className={classes.root}>
      <Fab
        color="secondary"
        aria-label="cart"
        style={{
          position: "sticky",
          zIndex: "1000",
          marginTop: show ? "-0px" : "200px",
          float: "right",
          marginRight: "100px",
          transition: ".25s",
        }}
      >
        <ShoppingCartIcon onClick={handleClick} />
      </Fab>
      <TableContainer
        component={Paper}
        style={{
          maxHeight: "300px",
          width: "80%",
          position: "fixed",
          bottom: "135px",
          marginLeft: "50px",
          zIndex: "999",
          visibility: show ? "" : "hidden",
        }}
      >
        <div></div>
        <Box border={2} borderRadius={16}>
          <Table className={classes.table} aria-label="sticky table">
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
                    <Button
                      onClick={props.onAddItem.bind(
                        this,
                        item.id,
                        item.name,
                        item.count,
                        item.price
                      )}
                    >
                      +
                    </Button>
                    {item.count} 개
                    <Button
                      onClick={props.onReduce.bind(
                        this,
                        item.id,
                        item.name,
                        item.count,
                        item.price
                      )}
                    >
                      -
                    </Button>
                  </TableCell>
                  {/* <TableCell align="right">{item.unit}</TableCell> */}
                  <TableCell align="right">
                    {ccyFormat(item.price)} 원
                    <Button onClick={props.onRemove.bind(this, item.id)}>
                      X
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2}>합 계</TableCell>
                <TableCell align="right">{subtotal(props.cart)} 원</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div style={{ display: "flex" , marginLeft: "20%"}}>
            <PurchaseButton cart={props.cart} />
            <Button
              variant="contained"
              size="large"
              style={{ marginLeft: "30%" }}
              onClick={props.onReset}
            >
              비 우 기
            </Button>
          </div>
        </Box>
      </TableContainer>
    </div>
  );
}


class Layout extends React.Component {
  constructor(props) {
    super(props);
    // this.history = useHistory();
    this.state = { 
      index: (store.getState().userInfo === undefined) ? 3 : 0, 
      cart: []
    };
  };
  
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


  handleReset = () => {
    this.setState({cart: []});
  }

  render() {
    console.log("store.getState().userInfo in class ", store.getState().userInfo);
    console.log("store.getState().items in class ", store.getState().items);
    // let hasUserInfo = false;

    // if(userInfo !== undefined){
    //   hasUserInfo = true;
    // }

    // console.log("hasUserInfo : ", hasUserInfo);

    const { index, cart } = this.state;
    return (
      <div
        position="relative"
        style={{ marginTop: "50px", marginBottom: "100px", minHeight: "500px" }}
      >
        <Typography
          style={
            store.getState().userInfo === undefined
              ? Object.assign({}, styles.noUserComment)
              : Object.assign({}, styles.hasUserComment)
          }
          // style={{  textAlign: "center", fontWeight: "400", fontSize: "xx-large", marginBottom: "20px" }}
        >
          환영합니다,{" "}
          {store.getState().userInfo === undefined
            ? "NO user"
            : store.getState().userInfo.name}{" "}
          님, 맛있게 해드릴게요~
        </Typography>

        <div
          style={
            store.getState().userInfo === undefined
              ? Object.assign({}, styles.noUser)
              : Object.assign({}, styles.hasUser)
          }
          // className={(store.getState().userInfo === undefined) ? styles.noUser : styles.hasUser}>
        >
          <BottomNavigation
            value={this.state.index}
            onChange={this.handleChangeNav}
            showLabels
          >
            <BottomNavigationAction width="500" label="추천 메뉴" />
            <BottomNavigationAction label="최근 먹은 메뉴" />
            <BottomNavigationAction label="자주 먹은 메뉴" />
            <BottomNavigationAction label="전체 메뉴" />
          </BottomNavigation>
        </div>

        {store.getState().items !== undefined ? (
          <SwipeableViews
            index={this.state.index}
            onChangeIndex={this.handleChangeIndex}
          >
            {/* {console.log("items : ", store.getState().items)}
          {console.log("items.recommend : ", store.getState().items.recommend)} */}
            <div style={Object.assign({}, styles.slide1)}>
              <RecommendMenu
                recommendInfo={store.getState().items.recommend}
                menuData={menuData}
                onAdd={this.handleAdd}
              />
            </div>
            <div style={Object.assign({}, styles.slide2)}>
              <RecentMenu
                recentInfo={store.getState().items.recent}
                menuData={menuData}
                onAdd={this.handleAdd}
              />
            </div>
            <div style={Object.assign({}, styles.slide3)}>
              <FavoriteMenu
                favoriteInfo={store.getState().items.favorite}
                menuData={menuData}
                onAdd={this.handleAdd}
              />
            </div>
            <div style={Object.assign({}, styles.slide4)}>
              <AllMenu menuData={menuData} onAdd={this.handleAdd} />
            </div>
          </SwipeableViews>
        ) : (
          <div style={Object.assign({}, styles.slide4)}>
            <AllMenu menuData={menuData} onAdd={this.handleAdd} />
          </div>
        )}
        <SpanningTable
          cart={cart}
          style={{ position: "sticky", zIndex: "999" }}
          onPurchase={this.handlePurchase}
          onReset={this.handleReset}
          onRemove={this.handleRemove}
          onReduce={this.handleReduceCount}
          onAddItem={this.handleAddCount}
          cart={cart}
        />
      </div>
    );
  }
}

export default Layout;
