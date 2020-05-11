import React from 'react';
import { connect } from 'react-redux';

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from '../../redux/cart/cart.actions';

import {
  CheckoutItemContainer,
  ImageContainer,
  StyledSpan,
  QuantityContainer,
  ArrowContainer,
  ValueContainer,
  RemoveButton,
} from './checkout-item.styles.jsx';

const CheckoutItem = ({ cartItem, clearItemFromCart, addItem, removeItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img alt='item' src={imageUrl} />
      </ImageContainer>
      <StyledSpan>{name}</StyledSpan>
      <QuantityContainer>
        <ArrowContainer onClick={() => removeItem(cartItem)}>
          &#10094;
        </ArrowContainer>
        <ValueContainer>{quantity}</ValueContainer>
        <ArrowContainer onClick={() => addItem(cartItem)}>
          &#10095;
        </ArrowContainer>
      </QuantityContainer>
      <StyledSpan>{price}</StyledSpan>
      <RemoveButton
        className='remove-button'
        onClick={() => clearItemFromCart(cartItem)}
      >
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  clearItemFromCart: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
