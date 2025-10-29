import React from 'react';
import { Route, useLocation } from 'wouter';
import useAuth from '../../hooks/useAuth';

interface ProtectedRouteProps {
  path: string;
  component: React.FC;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, component: Component }) => {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  if (loading) return <div className="p-8">Loading...</div>;

  if (!user) return null;

  return <Route path={path}>{() => <Component />}</Route>;
};

export default ProtectedRoute;
