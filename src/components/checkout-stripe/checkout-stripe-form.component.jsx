import React, {useEffect} from 'react';
import {useStripe} from '@stripe/react-stripe-js';
import "./checkout-stripe-form.styles.scss"
import CustomButton from "../custom-button/custom-button.component";
import {loadStripe} from "@stripe/stripe-js";
import {checkoutSuccess} from "../../redux/user/user.actions";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectCartItemsTotal} from "../../redux/cart/cart.selectors";
import {onCheckoutSuccess} from "../../redux/cart/cart.sagas";


const stripePromise = loadStripe('pk_test_51HFXmAKEBHmgXIT4ZJcpwz3n70E93L2bkYnTz9z8sfNKGFe46O1NZYtZOrbzEh5lzc2FBgh1pAKDaSzfxmS96VGa000LZncdIE');

const CheckoutForm = ({totalPrice, cartItems, dispatchCheckoutSuccess}) => {
    const stripe = useStripe();

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            alert("Order placed! You will receive an email confirmation.");
            dispatchCheckoutSuccess();
        }
        if (query.get("canceled")) {
            alert(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);


    const handleClick = async (event) => {
        event.preventDefault();
        const stripe = await stripePromise;
        const response = await fetch("http://localhost:8080/api/v1/create-session", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cartItems)
        });

        const session = await response.json();
        console.log("LOG SESSION", session)
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.log(result.error.message);
            alert(result.error.message);
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
        }
    };

    return (
        <div className='checkout-form'>
            <form onSubmit={handleClick}>
                <CustomButton onClick={handleClick} id='checkout-button' type="submit" disabled={!stripe}>
                    Pay
                </CustomButton>
            </form>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    totalPrice: selectCartItemsTotal
});

const mapDispatchToProps = dispatch => ({
    dispatchCheckoutSuccess: () => dispatch(checkoutSuccess())
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);