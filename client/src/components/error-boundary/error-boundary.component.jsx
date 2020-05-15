import React from 'react';

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText,
} from './error-boundary.styles';

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDrivedStateFromError(err) {
    return { hasErrored: true };
  }

  componentDidCatch(err, info) {
    console.log(err);
  }

  render() {
    const { hasErrored } = this.state;
    const { children } = this.props;

    return hasErrored ? (
      <ErrorImageOverlay>
        <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png' />
        <ErrorImageText>Sorry this page is broken.</ErrorImageText>
      </ErrorImageOverlay>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
