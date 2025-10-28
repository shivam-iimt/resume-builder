import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './contexts/ResumeContext';
import { AuthProvider } from './contexts/AuthContext';
import Editor from './components/Editor';
import Preview from './components/Preview';
import PDFExport from './components/PDFExport';
import PublicRoute from './routes/PublicRoute';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './components/Home';

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div className="p-4">Loading editor...</div>}>
                  <div className="flex flex-col md:flex-row h-screen">
                    <div className="md:w-1/2 overflow-auto border-r">
                      <Editor />
                    </div>
                    <div className="md:w-1/2 overflow-auto p-4">
                      <Preview />
                      <PDFExport />
                    </div>
                  </div>
                </React.Suspense>
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
