import React from 'react';
import { Route, Switch } from 'wouter';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ProtectedRoute from '../components/common/protectedRoute';
import NotFound from '../pages/NotFound';
import ResumeBuilder from '../pages/resume-builder/ResumeBuilder';
import Dashboard from '../pages/dashboard/Dashboard';

export default function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/resume" component={ResumeBuilder} />
      <Route component={NotFound} />
    </Switch>
  );
}
