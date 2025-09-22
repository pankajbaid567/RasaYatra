import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthGuard = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Routes that don't require authentication
  const publicRoutes = ['/login', '/signup'];
  
  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // If user is not authenticated and trying to access a protected route
  if (!isAuthenticated && !isPublicRoute) {
    // Redirect to signup page with the intended destination
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  // If user is authenticated and trying to access login/signup pages
  if (isAuthenticated && isPublicRoute) {
    // Redirect authenticated users away from auth pages
    const redirectTo = location.state?.from?.pathname || '/';
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default AuthGuard;