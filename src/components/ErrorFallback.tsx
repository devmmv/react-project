import { Component } from 'react';

class ErrorFallback extends Component {
  render() {
    return (
      <div className="error-fallback">
        <h1>Something went wrong!</h1>
      </div>
    );
  }
}

export default ErrorFallback;
