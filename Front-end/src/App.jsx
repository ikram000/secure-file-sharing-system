import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Dashboard';
import Security from './pages/Security';
import Files from './pages/Files';
import Users from './pages/Users';

import DashboardLayout from './components/DashboardLayout';


// Protected Route
const ProtectedRoute = ({ children }) => {

  const token =
    localStorage.getItem("token");

  return token
    ? children
    : <Navigate to="/login" replace />;

};


function App() {

  return (

    <Router>

      <div className="bg-glow-1"></div>

      <Routes>

        {/* Redirect */}
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Layout */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Files */}
          <Route
            path="/files"
            element={<Files />}
          />

          {/* Security */}
          <Route
            path="/security"
            element={<Security />}
          />

          {/* Users */}
          <Route
            path="/users"
            element={<Users />}
          />

        </Route>

      </Routes>

    </Router>

  );

}

export default App;