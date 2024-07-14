import { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps } from '../types';
import ErrorFallback from './ErrorFallback';

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }
  componentDidCatch(_: Error, errorInfo: ErrorInfo) {
    console.log('Catched error', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
