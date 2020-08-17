import React from 'react';
import "./checkout.styles.scss"
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectCartItemsTotal} from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "../../components/stripe-button/stripe-checkout-form.component";


const CheckoutPage = ({cartItems, cartItemsTotalPrice}) => {
    const stripePromise = loadStripe('pk_test_51HFXmAKEBHmgXIT4ZJcpwz3n70E93L2bkYnTz9z8sfNKGFe46O1NZYtZOrbzEh5lzc2FBgh1pAKDaSzfxmS96VGa000LZncdIE');
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
            <Elements stripe={stripePromise}>
                <CheckoutForm price={cartItemsTotalPrice}></CheckoutForm>
            </Elements>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartItemsTotalPrice: selectCartItemsTotal
});

export default connect(mapStateToProps, null)(CheckoutPage);