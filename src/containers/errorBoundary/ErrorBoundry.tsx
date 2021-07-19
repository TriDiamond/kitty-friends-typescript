import React, { Component } from 'react';

export class ErrorBoundry extends Component {
  state: { hasError: boolean } = {
    hasError: false,
  };

  constructor(props: any = {}) {
    super(props);
  }

  // This is like `try catch`
  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops. That is not good :(</h1>;
    } else {
      return this.props.children;
    }
  }
}
