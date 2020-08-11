import React from 'react';
import './cart-dropdown.styles.scss';
import {connect} from 'react-redux';
import {selectCartItems} from "../../redux/cart/cart.selectors";
import {createStructuredSelector} from 'reselect';
import {withRouter} from "react-router-dom";
import CartItem from "../cart-item/cart-item.component";
import CustomButton from '../custom-button/custom-button.component';
import {toggleCartHidden} from "../../redux/cart/cart.actions";

/**
 * if mapDispatchToProps is not declared in connect,
 * dispatch can be added to the props manually
 */
const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className='cart-dropdown'>
            {cartItems.length ? cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>) :
                (<span className='empty-message'>Your cart is empty</span>)
            }
            <CustomButton onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden())
            }}> GO TO CHECK OUT </CustomButton>
    </div>
);


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));