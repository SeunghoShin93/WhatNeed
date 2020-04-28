import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as shoppingActions from '../store/modules/shopping';
import MenuGridItem from '../components/MenuGridItem';

class MenuGridItemContainer extends React.Component {

    handleAdd = id => {
        const { ShoppingActions } = this.props;
        ShoppingActions.add(id);
    };
    handleRemove = id => {
        const { ShoppingActions } = this.props;
        ShoppingActions.remove(id);
    }    
    render() {
        const { cart } = this.props;
        return(
            <MenuGridItem
                cart={cart}
                onAdd={this.handleAdd}
                onRemove={this.handleRemove}
            />
        )
    }
}

const  mapStateToProps = ({ shopping }) => ({
    cart: shopping.cart
});

const mapDispatchToProps = dispatch => ({
    ShoppingActions: bindActionCreators(shoppingActions, dispatch),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuGridItemContainer);
