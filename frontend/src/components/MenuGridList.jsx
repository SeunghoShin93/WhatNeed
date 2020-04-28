import React from 'react';
import MenuGridItem from './MenuGridItem';
import GridList from "@material-ui/core/GridList";

class MenuGridList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tempMenus: [{name: '아이스 아메리카노', price: 3000 ,image: 'https://www.mpps.co.kr/kfcs_api_img/KFCS/goods/DL_1444526_20191120095427842.png'},
            {name: '라떼', price: 3500 , image: 'https://t1.daumcdn.net/cfile/tistory/11509E4D4F7316E919'},
            {name: '아메리카노', price: 3000, image: 'https://www.kfckorea.com/nas/product/zV9cxVUQ1Iq1.png'},
            {name: '흑당 버블티 라떼', price: 4500, image: 'https://www.twosome.co.kr:7009/Twosome_file/PRODUCT/949_big_img'},
            {name: '오렌지 쥬스', price: 5000, image: 'https://imagescdn.gettyimagesbank.com/500/201503/a9656277.jpg'}
            ]
        }
    }

    render() {
        return (
            <div style={{ display: 'inline-flex'}} >
                <GridList sm={3} cellHeight={"auto"}>
                {this.state.tempMenus.map((menu, i) => {
                    return (<MenuGridItem name={menu.name} price={menu.price} image={menu.image}  key={i}/>)
                })}
                </GridList>
            </div>
        )
    }
}

export default MenuGridList;