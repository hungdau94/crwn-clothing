import React from 'react';
import {CartItemContainer, CartItemDetailsContainer} from "./cart-item.styles";

const CartItem = ({item: {imageUrl, price, name, quantity}}) => (
    <CartItemContainer>
        <img src={imageUrl} alt='item'></img>
        <CartItemDetailsContainer>
            <span className='name'>{name}</span>
            <span className='price'>{quantity} x {price}$</span>
        </CartItemDetailsContainer>
    </CartItemContainer>
);

export default CartItem;