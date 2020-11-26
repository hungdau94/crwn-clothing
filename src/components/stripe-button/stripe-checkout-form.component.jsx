import React from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import "./stripe-checkout-form.styles.scss"
import CustomButton from "../custom-button/custom-button.component";

const CheckoutForm = ({price}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            console.log('[PaymentMethod]', JSON.stringify(paymentMethod));
        }
    };

    return (
        <div className='checkout-form'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <CustomButton id='checkout-button'type="submit" disabled={!stripe}>
                    Pay
                </CustomButton>

            </form>
        </div>
    );
};

export default CheckoutForm;