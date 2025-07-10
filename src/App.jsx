import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage } from "./features/auth/authSlice";
import AppRoutes from "./routes/AppRoutes";
import ThemeToggle from "./components/ThemeToggle";
import Navigation from "./components/Navigation";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

function AppContent() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  // Non mostrare Navigation per le routes che usano DashboardLayout
  const showNavigation = isAuthenticated && !['/feed', '/analytics', '/create', '/profile'].some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {showNavigation && <Navigation />}
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
    <BrowserRouter>
        <AppContent />
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
