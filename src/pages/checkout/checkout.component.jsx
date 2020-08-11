import React from 'react';
import "./checkout.styles.scss"
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectCartItemsTotal} from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const CheckoutPage = ({cartItems, cartItemsTotalPrice}) => {
    return (
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.length
                ? cartItems.map(cartItem => (<CheckoutItem key={cartItem.id} cartItem={cartItem}/>))
                : 'cart is empty'.toUpperCase()
            }
            <div className='total'>
                <span>Total: {cartItemsTotalPrice}$</span>
            </div>

        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartItemsTotalPrice: selectCartItemsTotal
});

export default connect(mapStateToProps, null)(CheckoutPage);