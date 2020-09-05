import React from 'react';

import {connect} from "react-redux";
import {addItem, clearItemFromCart, removeItem} from "../../redux/cart/cart.actions";
import {CheckoutItemContainer, ImageContainer, TextContainer, QuantityContainer, RemoveButtonContainer} from "./checkout.styles";

/**
 * We pass in the full cartItem here
 * be cause we need to interact with it on page
 */
const CheckoutItem = ({cartItem, addItem, removeItem, clearItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    let fullPrice = price * quantity;
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt='item'/>
            </ImageContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>
                <div className='arrow' onClick={() => removeItem(cartItem)}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>
            </QuantityContainer>
            <TextContainer>{fullPrice}$</TextContainer>
            <RemoveButtonContainer onClick={() => clearItem(cartItem)}>&#10005;</RemoveButtonContainer>
        </CheckoutItemContainer>
    )
};

const mapDispatchToProps = dispatch => ({
    clearItem: (cartItem) => dispatch(clearItemFromCart(cartItem)),
    addItem: (cartItem) => dispatch(addItem(cartItem)),
    removeItem: (cartItem) => dispatch(removeItem(cartItem))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);