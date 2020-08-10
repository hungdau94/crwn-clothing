import React from 'react';

import './checkout-item.styles.scss'
import {connect} from "react-redux";
import {addItem, clearItemFromCart, removeItem} from "../../redux/cart/cart.actions";

/**
 * We pass in the full cartItem here
 * be cause we need to interact with it on page
 */
const CheckoutItem = ({cartItem, addItem, removeItem, clearItem}) => {
    const { name, imageUrl, price, quantity} = cartItem;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item'/>
            </div>
            <div className='name'>{name}</div>
            <div className='quantity'>
                <div className='arrow' onClick={() => removeItem(cartItem)}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>
            </div>
            <div className='price'>{price}</div>
            <div className='remove-button' onClick={() => clearItem(cartItem)}>&#10005;</div>
        </div>
    )
};
const mapDispatchToProps = dispatch => ({
    clearItem: (cartItem) => dispatch(clearItemFromCart(cartItem)),
    addItem: (cartItem) => dispatch(addItem(cartItem)),
    removeItem: (cartItem) => dispatch(removeItem(cartItem))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);