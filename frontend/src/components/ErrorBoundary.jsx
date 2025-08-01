import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 bg-red-100 text-red-800">Une erreur est survenue lors du rendu 3D.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;