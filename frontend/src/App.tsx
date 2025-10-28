import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './contexts/ResumeContext';
import { AuthProvider } from './contexts/AuthContext';
import PublicRoute from './routes/PublicRoute';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './components/Home';
import EditorLayout from './components/editor/EditorLayout';
import Layout from './components/layout/Layout';

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <Layout>
                  <EditorLayout /> {/* or the same structure you used */}
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="/public/:slug" element={<PublicRoute />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="*" element={<div className="p-4">Page not found</div>} />
        </Routes>
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
