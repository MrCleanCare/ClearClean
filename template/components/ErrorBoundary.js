import React from 'react';
import { useTranslation } from 'next-i18next';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 text-center">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                {this.props.t ? this.props.t('error.title') : 'Something went wrong'}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {this.props.t ? this.props.t('error.description') : 'Please try refreshing the page'}
              </p>
            </div>
            <div>
              <button
                onClick={() => window.location.reload()}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {this.props.t ? this.props.t('error.refresh') : 'Refresh Page'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC to inject translation function
export default function ErrorBoundaryWithTranslation(props) {
  const { t } = useTranslation('translation');
  return <ErrorBoundary {...props} t={t} />;
} 