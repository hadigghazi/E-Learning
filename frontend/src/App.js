import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage'; 
import ProtectedRoute from './components/ProtectedRoute';
import WelcomePage from './pages/WelcomePage';

const App = () => {
    return (
        <Router>
            <Routes>
              <Route path='/' element={<WelcomePage />} />
            <Route
          path="/login"
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </Router>
    );
};

export default App;
