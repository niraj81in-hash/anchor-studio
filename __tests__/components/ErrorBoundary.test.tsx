import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '@/components/ErrorBoundary';

describe('ErrorBoundary', () => {
  const ChildComponent = () => <div>Child Component</div>;
  const ErrorComponent = () => {
    throw new Error('Test error');
  };

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('should display error message when child throws', () => {
    // Suppress console.error for this test
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(/We apologize for the inconvenience/i)).toBeInTheDocument();

    consoleError.mockRestore();
  });

  it('should show error details in expandable section', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const details = screen.getByText('Error details');
    expect(details).toBeInTheDocument();

    consoleError.mockRestore();
  });
});
