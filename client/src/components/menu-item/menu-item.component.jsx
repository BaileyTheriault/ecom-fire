import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  TitleContainer,
  StyledSpan,
} from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, history, match, linkUrl }) => (
  <MenuItemContainer
    size={size}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <BackgroundImageContainer
      imageUrl={imageUrl}
      className='background-image'
    />
    <ContentContainer className='content'>
      <TitleContainer>{title}</TitleContainer>
      <StyledSpan>SHOP NOW</StyledSpan>
    </ContentContainer>
  </MenuItemContainer>
);

export default withRouter(MenuItem);
