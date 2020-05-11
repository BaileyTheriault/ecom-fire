import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_hvtqfLmq3aBcUhaD5BHXXGSy00Ny0bQ12G';

  const onToken = token => {
    fetch('http://localhost:5000/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        amount: priceForStripe,
      }),
    })
      .then(res => {
        alert('Payment successful');
      })
      .catch(err => alert('There was an issue with your payment.'));
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='ECOM Fire'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
