import API from "../api/axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Shield,
  Mail,
  Key,
  ShieldCheck
} from "lucide-react";

import "./Auth.css";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Login Function
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      // Check Response
      console.log(res.data);

      // Save Token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Success");

      // Redirect
      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.msg
        || "Login Failed"
      );

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-content animate-fade-in">

        {/* Header */}
        <div className="auth-header">

          <div className="logo-icon-container">

            <Shield
              className="logo-icon"
              size={28}
            />

          </div>

          <h1>SecureVault FS</h1>

          <p>
            Secure File Sharing System
          </p>

        </div>

        {/* Login Card */}
        <div className="auth-card glass-panel">

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="form-group">

              <label>Email Address</label>

              <div className="input-with-icon">

                <Mail
                  className="input-icon"
                  size={18}
                />

                <input
                  type="email"
                  className="input-field"
                  placeholder="admin@fortress.node"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div className="form-group">

              <div className="label-row">

                <label>Master Key</label>

                <a
                  href="#"
                  className="forgot-link"
                >
                  Forgot Key?
                </a>

              </div>

              <div className="input-with-icon">

                <Key
                  className="input-icon"
                  size={18}
                />

                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            {/* Checkbox */}
            <div className="checkbox-group">

              <input
                type="checkbox"
                id="verify-device"
              />

              <label htmlFor="verify-device">

                Verify device identity
                for 30 days

              </label>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn-primary"
              style={{ marginTop: "24px" }}
            >

              <ShieldCheck size={18} />

              Secure Login

            </button>

          </form>

          {/* Footer */}
          <div className="auth-footer-link">

            <p>
              Don't have a secure node?
            </p>

            <Link
              to="/register"
              className="btn-outline"
              style={{ marginTop: "12px" }}
            >

              Request Access

            </Link>

          </div>

        </div>

        {/* Status */}
        <div className="auth-system-status">

          <div className="status-item">

            <span className="status-dot green"></span>

            System
            <br />
            Online

          </div>

          <div className="status-divider"></div>

          <div className="status-item">

            Node:
            <br />
            Alpha-7

          </div>

          <div className="status-divider"></div>

          <div className="status-item">

            v2.4.0-
            <br />
            Stable

          </div>

        </div>

      </div>

    </div>

  );

};

export default Login;