import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import WelcomePage from './pages/WelcomePage';
import Navbar from './components/Navbar';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AddCoursePage from './pages/AddCoursePage';
import WithdrawalsPage from './pages/WithdrawalsPage';

const App = () => {
    return (
        <Router>
            <Navbar />

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
                <Route path='/courses' element={<CoursesPage />} />
                <Route path="/courses/:id" element={<CourseDetailPage />} />
                <Route path="/add-course" element={<AddCoursePage />} />
                <Route path="/withdrawals" element={<WithdrawalsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
