import React from 'react';
import { Shield, KeyRound, UserCircle, Network, Globe } from 'lucide-react';
import './Security.css';

const Security = () => {
  return (
    <div className="security-container animate-fade-in">
      <div className="security-header">
        <h1>Security Infrastructure</h1>
        <p>Our multi-layered defense architecture ensures that every byte of data is protected by industry-leading protocols and cryptographic standards.</p>
      </div>

      <div className="security-grid">
        {/* Large Card: AES-256 */}
        <div className="security-card large">
          <div className="card-content" style={{ flex: 1 }}>
            <div className="security-icon-wrapper">
              <Shield size={28} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3>AES-256 Encryption</h3>
                <p>
                  Advanced Encryption Standard with a 256-bit key length. This symmetric encryption algorithm is the global standard for securing sensitive data, making brute-force attacks computationally impossible for centuries.
                </p>
              </div>
              <div className="military-grade-badge">
                <Shield size={14} /> Military Grade
              </div>
            </div>
            <div className="encryption-status">
              <div className="encryption-bar-bg">
                <div className="encryption-bar-fill"></div>
              </div>
              <div className="encryption-labels">
                <span>ENCRYPTION ACTIVE</span>
                <span>100% SECURE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medium Card: JWT */}
        <div className="security-card">
          <div className="security-icon-wrapper">
            <KeyRound size={28} />
          </div>
          <h3>JWT Authentication</h3>
          <p>
            Stateless authentication using JSON Web Tokens ensures secure, scalable user sessions without server-side storage.
          </p>
          <div className="jwt-status">
            <span className="jwt-dot"></span> Tokens rotating every 15m
          </div>
        </div>

        {/* Medium Card: Granular Access */}
        <div className="security-card">
          <div className="security-icon-wrapper">
            <UserCircle size={28} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
             <h3>Granular Access</h3>
          </div>
          <span className="rbac-badge">RBAC ENABLED</span>
          <p>
            Role-Based Access Control allows you to define precise permissions for every file and folder. Restrict viewing, editing, or sharing capabilities based on organizational hierarchy or project needs.
          </p>
        </div>

        {/* Medium Card: Secure Distributed Storage */}
        <div className="security-card" style={{ flexDirection: 'row', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <div className="security-icon-wrapper" style={{ marginBottom: '16px' }}>
              <Network size={28} />
            </div>
            <h3>Secure Distributed Storage</h3>
            <p>
              Files are fragmented and distributed across a global network of encrypted nodes. No single point of failure and no centralized database to breach.
            </p>
          </div>
          <div className="storage-illustration">
             <Globe size={64} style={{ opacity: 0.7, color: 'var(--accent-primary)' }} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Security;
