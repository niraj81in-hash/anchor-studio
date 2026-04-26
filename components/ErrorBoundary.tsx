'use client';

import React, { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // You could log to an error tracking service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto mt-10">
          <h2 className="text-red-800 font-semibold mb-2">Oops! Something went wrong</h2>
          <p className="text-red-700 text-sm mb-4">
            We apologize for the inconvenience. Please refresh the page or contact us at hello@getanchorstudio.com
          </p>
          <details className="text-xs text-red-600 cursor-pointer">
            <summary>Error details</summary>
            <pre className="mt-2 bg-red-100 p-2 rounded overflow-auto">
              {this.state.error?.message}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
