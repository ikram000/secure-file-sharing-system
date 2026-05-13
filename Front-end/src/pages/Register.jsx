import API from "../api/axios.js";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Shield,
  User,
  AtSign,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

import './Auth.css';

const Register = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Register Function
  const handleRegister = async (e) => {

    e.preventDefault();

    // Password Match Check
    if (password !== confirmPassword) {

      alert("Passwords do not match");

      return;

    }

    try {

      // API Request
      await API.post("/auth/register", {

        name: fullName,
        email,
        password

      });

      alert("Register Success");

      navigate("/login");

    } catch (err) {

      alert(
        err.response?.data?.msg || "Register Failed"
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

          <h1>
           SecureVault FS
          </h1>

          <p>
            Create your secure node access
          </p>

        </div>

        {/* Card */}
        <div
          className="auth-card glass-panel"
          style={{
            marginBottom: '32px'
          }}
        >

          <form onSubmit={handleRegister}>

            {/* Full Name */}
            <div className="form-group">

              <label>
                Full Name
              </label>

              <div className="input-with-icon">

                <User
                  className="input-icon"
                  size={18}
                />

                <input
                  type="text"
                  className="input-field"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            {/* Email */}
            <div className="form-group">

              <label>
                Security Email
              </label>

              <div className="input-with-icon">

                <AtSign
                  className="input-icon"
                  size={18}
                />

                <input
                  type="email"
                  className="input-field"
                  placeholder="admin@fortress-node.io"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

              {email.includes('@') && (

                <div className="success-text">

                  <CheckCircle2 size={12} />

                  Valid encryption-ready domain

                </div>

              )}

            </div>

            {/* Password */}
            <div className="form-group">

              <label>
                Master Password
              </label>

              <div className="input-with-icon">

                <Lock
                  className="input-icon"
                  size={18}
                />

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  className="input-field"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="input-action-icon"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >

                  {showPassword ? (

                    <EyeOff size={18} />

                  ) : (

                    <Eye size={18} />

                  )}

                </button>

              </div>

              {password.length > 0 && (

                <>

                  <div className="strength-meter">

                    <div
                      className={`strength-bar ${
                        password.length > 0
                          ? 'active'
                          : ''
                      }`}
                    ></div>

                    <div
                      className={`strength-bar ${
                        password.length > 5
                          ? 'active'
                          : ''
                      }`}
                    ></div>

                    <div
                      className={`strength-bar ${
                        password.length > 8
                          ? 'active'
                          : ''
                      }`}
                    ></div>

                  </div>

                  <span className="strength-text">
                    High Entropy Strength
                  </span>

                </>

              )}

            </div>

            {/* Confirm Password */}
            <div className="form-group">

              <label>
                Confirm Password
              </label>

              <div className="input-with-icon">

                <ShieldCheck
                  className="input-icon"
                  size={18}
                />

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  className="input-field"
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  required
                />

              </div>

            </div>

            {/* Terms */}
            <div className="checkbox-group">

              <input
                type="checkbox"
                id="agree-terms"
                required
              />

              <label htmlFor="agree-terms">

                I agree to the{" "}

                <a href="#">
                  Security Protocols
                </a>

                {" "}and{" "}

                <a href="#">
                  Privacy Policy
                </a>

              </label>

            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn-primary"
              style={{
                marginTop: '24px'
              }}
            >

              CREATE SECURE ACCOUNT

              <ArrowRight size={18} />

            </button>

          </form>

          {/* Footer */}
          <div
            className="auth-footer-link"
            style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop:
                '1px solid var(--border-subtle)',
              textAlign: 'center'
            }}
          >

            <span
              style={{
                fontSize: '13px',
                color:
                  'var(--text-secondary)'
              }}
            >

              Already have a secure node?{" "}

              <Link
                to="/login"
                style={{
                  color:
                    'var(--text-primary)',
                  fontWeight: '500'
                }}
              >

                Login to Vault

              </Link>

            </span>

          </div>

        </div>

        {/* Status */}
        <div className="auth-system-status">

          <div className="status-item">

            <span className="status-dot green"></span>

            Node Status: Operational

          </div>

          <div
            className="status-item"
            style={{
              marginLeft: 'auto'
            }}
          >

            v4.2.0-secure

          </div>

          <div className="status-item">

            Global-7

          </div>

        </div>

      </div>

    </div>

  );

};

export default Register;