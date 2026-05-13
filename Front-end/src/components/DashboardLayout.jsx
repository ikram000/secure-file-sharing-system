import React from 'react';

import {
  NavLink,
  Outlet,
  useNavigate
} from 'react-router-dom';

import {
  LayoutDashboard,
  Folder,
  Shield,
  Settings,
  FileUp,
  Search,
  Bell,
  Cast,
  LogOut,
  Users
} from 'lucide-react';

import './DashboardLayout.css';

const DashboardLayout = () => {

  // Navigate
  const navigate = useNavigate();

  // Logged In User
  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // Logout Function
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    alert("Logout Successful");

    navigate("/login");

  };

  return (

    <div className="dashboard-layout">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-header">

          <h2>SecureVault FS</h2>

          <p>
            SECURE NODE FILE VAULT
          </p>

        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-item ${
                isActive ? 'active' : ''
              }`
            }
          >

            <LayoutDashboard size={20} />

            Dashboard

          </NavLink>

          <NavLink
            to="/files"
            className={({ isActive }) =>
              `nav-item ${
                isActive ? 'active' : ''
              }`
            }
          >

            <Folder size={20} />

            Files

          </NavLink>

          <NavLink
            to="/security"
            className={({ isActive }) =>
              `nav-item ${
                isActive ? 'active' : ''
              }`
            }
          >

            <Shield size={20} />

            Security

          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `nav-item ${
                isActive ? 'active' : ''
              }`
            }
          >

            <Settings size={20} />

            Settings

          </NavLink>

          {/* ADMIN ONLY USERS MENU */}
          {
            user?.role === "admin" && (

              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `nav-item ${
                    isActive ? 'active' : ''
                  }`
                }
              >

                <Users size={20} />

                Users

              </NavLink>

            )
          }

        </nav>

        {/* Footer */}
        <div className="sidebar-footer">

          {/* Upload Button */}
          <button
            className="btn-upload"
            onClick={() =>
              window.location.href = "/files"
            }
          >

            <FileUp size={18} />

            Upload Secure File

          </button>

          {/* User Profile */}
          <div className="user-profile">

            <div className="user-avatar">

              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                alt="User"
              />

            </div>

            <div className="user-info">

              <h4>
                {
                  user?.email ||
                  "Secure User"
                }
              </h4>

              <span>
                {
                  user?.role === "admin"
                    ? "Admin Access"
                    : "Protected Access"
                }
              </span>

            </div>

          </div>

          {/* Logout Button */}
          <button
            className="logout-btn"
            onClick={handleLogout}
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Topbar */}
        <header className="topbar">

          <div className="search-container">

            <Search
              className="search-icon"
              size={18}
            />

            <input
              type="text"
              className="search-input"
              placeholder="Search encrypted vault..."
            />

          </div>

          {/* Actions */}
          <div className="topbar-actions">

            <Bell
              className="action-icon"
              size={20}
            />

            <Cast
              className="action-icon"
              size={20}
            />

            <img
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              alt="Avatar"
              className="topbar-avatar"
            />

          </div>

        </header>

        {/* Page Content */}
        <div className="page-content animate-fade-in">

          <Outlet />

        </div>

      </main>

    </div>

  );

};

export default DashboardLayout;