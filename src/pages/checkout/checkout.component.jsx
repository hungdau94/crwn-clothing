import React from 'react';
import "./checkout.styles.scss"
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItems} from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const CheckoutPage = ({cartItems}) => {
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
                ? cartItems.map(cartIem => (<CheckoutItem cartItem={cartIem}/>))
                : 'cart is empty'.toUpperCase()
            }
            <div className='total'>
                <span>Total:</span>
            </div>

        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default connect(mapStateToProps, null)(CheckoutPage);