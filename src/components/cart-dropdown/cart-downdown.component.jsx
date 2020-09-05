import React from 'react';
import {connect} from 'react-redux';
import {selectCartItems} from "../../redux/cart/cart.selectors";
import {createStructuredSelector} from 'reselect';
import {withRouter} from "react-router-dom";
import {toggleCartHidden} from "../../redux/cart/cart.actions";
import {
    CartDropDownButton,
    CartDropDownContainer,
    CartDropDownItem,
    CartEmptyMessageSpan
} from "../cart-dropdown/cart-dropdown.styles";

/**
 * if mapDispatchToProps is not declared in connect,
 * dispatch can be added to the props manually
 */
const CartDropdown = ({cartItems, history, dispatch}) => (
    <CartDropDownContainer>
        {cartItems.length
            ? cartItems.map(cartItem => <CartDropDownItem key={cartItem.id} item={cartItem}/>)
            : (<CartEmptyMessageSpan>Your cart is empty</CartEmptyMessageSpan>)
        }
        <CartDropDownButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden())
        }}> GO TO CHECK OUT </CartDropDownButton>
    </CartDropDownContainer>
);


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));