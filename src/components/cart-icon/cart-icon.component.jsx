import React from 'react';
import {connect} from "react-redux";
import {toggleCartHidden} from "../../redux/cart/cart.actions.js";
import {selectCartItemsCount} from "../../redux/cart/cart.selectors";
import {createStructuredSelector} from 'reselect';
import {CartIconContainer, StyledShoppingIcon, ItemCountSpan} from "./cart-icon.styles";

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <CartIconContainer onClick={toggleCartHidden}>
        <StyledShoppingIcon/>
        <ItemCountSpan>{itemCount}</ItemCountSpan>
    </CartIconContainer>
);

// toggleCartHidden will be a function that dispatch toggleCartHidden
const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
   itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);