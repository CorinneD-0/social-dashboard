import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorContent({ error, onReset }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/feed');
    }
  };

  const handleGoHome = () => {
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="card-genz p-8 text-center max-w-md">
        <div className="text-6xl mb-6">😵</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Ops! Qualcosa è andato storto
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Si è verificato un errore inaspettato. Non preoccuparti, possiamo risolverlo!
        </p>
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="btn-genz w-full"
          >
            🔄 Ricarica Pagina
          </button>
          <button
            onClick={handleGoBack}
            className="btn-genz-secondary w-full"
          >
            ⬅️ Torna Indietro
          </button>
          <button
            onClick={handleGoHome}
            className="px-6 py-3 rounded-xl bg-gray-500 text-white hover:bg-gray-600 transition-colors w-full"
          >
            🏠 Vai alla Home
          </button>
        </div>
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Dettagli errore (solo sviluppo)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-auto">
              {error.toString()}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorContent error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 