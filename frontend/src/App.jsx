import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import EMRDemo from './pages/EMRDemo.jsx';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/emr"
          element={
            <ProtectedRoute>
              <EMRDemo />
            </ProtectedRoute>
          }
        />
        {/* Redirect to the login*/}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;