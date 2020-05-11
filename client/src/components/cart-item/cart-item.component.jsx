import React from 'react';

import {
  CartItemContainer,
  ItemDetailsContainer,
  StyledSpan,
} from './cart-item.styles.jsx';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemContainer>
    <img src={imageUrl} alt='item' />
    <ItemDetailsContainer>
      <StyledSpan>{name}</StyledSpan>
      <StyledSpan>
        {quantity} x ${price}
      </StyledSpan>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default CartItem;
