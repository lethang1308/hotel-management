import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Application ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
          <p className="eyebrow mb-2">Unexpected Error</p>
          <h1 className="font-display text-3xl sm:text-4xl text-primary mb-3">
            Something went wrong
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
            {this.state.error?.message || 'An unexpected interface error occurred.'}
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = '/';
            }}
            className="inline-flex items-center rounded-2xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-mid"
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
