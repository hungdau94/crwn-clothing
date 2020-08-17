import React from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import "./stripe-checkout-form.styles.scss"
import CustomButton from "../custom-button/custom-button.component";

const CheckoutForm = ({price}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
    };

    return (
        <div className='checkout-form'>
            <form onSubmit={handleSubmit}>
                <CardElement/>
                <CustomButton type="submit" disabled={!stripe}>
                    Pay Now
                </CustomButton>
            </form>
        </div>
    );
};

export default CheckoutForm;