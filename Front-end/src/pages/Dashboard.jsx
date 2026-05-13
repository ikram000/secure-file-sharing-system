import React, {
  useEffect,
  useState
} from 'react';

import API from "../api/axios";

import {
  Cloud,
  ShieldCheck,
  Key,
  FileText,
  FileVideo,
  FolderArchive,
  Download,
  Trash2,
  Globe,
  Database,
  ArrowRight
} from 'lucide-react';

import './Dashboard.css';

const Dashboard = () => {

  const [files, setFiles] =
    useState([]);

  // Fetch Files
  const fetchFiles = async () => {

    try {

      const res =
        await API.get("/files");

      setFiles(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchFiles();

  }, []);

  // Download File
  const handleDownload =
    async (file) => {

      try {

        const response =
          await API.get(

            `/files/download/${file._id}`,

            {
              responseType: "blob"
            }

          );

        const url =
          window.URL.createObjectURL(
            new Blob([response.data])
          );

        const link =
          document.createElement("a");

        link.href = url;

        link.setAttribute(
          "download",
          file.filename
        );

        document.body.appendChild(link);

        link.click();

        link.remove();

      } catch (err) {

        console.log(err);

        alert("Download Failed");

      }

    };

  // Delete File
  const handleDelete =
    async (id) => {

      try {

        await API.delete(
          `/files/${id}`
        );

        alert("File Deleted");

        fetchFiles();

      } catch (err) {

        console.log(err);

        alert("Delete Failed");

      }

    };

  return (

    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">

        <div className="dashboard-title">

          <h1>
            Secure Dashboard
          </h1>

          <p>
            Monitoring real-time
            encryption and node
            integrity.
          </p>

        </div>

        <div className="header-stats">

          <div className="stat-badge">

            <span className="dot"></span>

            NODE ACTIVE

          </div>

          <div className="stat-badge">

            <Database size={16} />

            4.2 TB / 10 TB

          </div>

        </div>

      </div>

      {/* Top Cards */}
      <div className="dashboard-grid">

        {/* Drop Zone */}
        <div className="drop-zone">

          <div className="cloud-icon-wrapper">

            <Cloud size={32} />

          </div>

          <h3>
            Secure Drop Zone
          </h3>

          <p>
            Drag and drop sensitive
            files here for immediate
            AES-256 military-grade
            encryption and decentralized
            storage.
          </p>

          <div className="upload-progress">

            <div className="progress-header">

              <span>
                Encrypting:
                <span className="filename">
                  confidential_q4_results.pdf
                </span>
              </span>

              <span>74%</span>

            </div>

            <div className="progress-bar-bg">

              <div className="progress-bar-fill"></div>

            </div>

            <div className="progress-status">

              ACTIVE SHARDING...

            </div>

          </div>

        </div>

        {/* Side Cards */}
        <div className="side-cards">

          <div className="info-card">

            <div className="info-card-header">

              <ShieldCheck size={16} />

              Encryption Health

            </div>

            <div className="info-card-value">
              99.9%
            </div>

            <div className="info-card-desc">

              Optimal node verification
              across all clusters.
              No leaks detected.

            </div>

          </div>

          <div className="info-card">

            <div className="info-card-header">

              <Key size={16} />

              Active Keys

            </div>

            <div className="info-card-value">
              1,204
            </div>

            <div className="info-card-desc">

              RSA-4096 rotational cycles
              completed 4m ago.

            </div>

          </div>

        </div>

      </div>

      {/* Files Table */}
      <div className="table-section">

        <div className="table-header-row">

          <h3>
            Recent Secure Assets
          </h3>

          <a
            href="#"
            className="view-all-link"
          >

            View Full Vault

            <ArrowRight size={14} />

          </a>

        </div>

        <table className="data-table">

          <thead>

            <tr>

              <th>Name</th>

              <th>Size</th>

              <th>Upload Date</th>

              <th>Encryption</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {
              files.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "30px"
                    }}
                  >

                    No Files Uploaded

                  </td>

                </tr>

              ) : (

                files.map((file) => (

                  <tr key={file._id}>

                    <td>

                      <div className="file-name-cell">

                        {
                          file.filename
                            ?.includes(".mp4")
                            ? (
                              <FileVideo
                                className="file-icon"
                                size={18}
                              />
                            ) : file.filename
                              ?.includes(".zip")
                              ? (
                                <FolderArchive
                                  className="file-icon"
                                  size={18}
                                />
                              ) : (
                                <FileText
                                  className="file-icon"
                                  size={18}
                                />
                              )
                        }

                        {file.filename}

                      </div>

                    </td>

                    <td>

                      {
                        file.size
                          ? (
                            file.size / 1024
                          ).toFixed(2)
                          : "0"
                      }
                      {" "}KB

                    </td>

                    <td>

                      {
                        new Date(
                          file.createdAt
                        ).toLocaleDateString()
                      }

                    </td>

                    <td>

                      <span className="badge-enc">

                        AES-256

                      </span>

                    </td>

                    <td>

                      <div className="action-btns">

                        <button
                          className="action-btn"
                          onClick={() =>
                            handleDownload(file)
                          }
                        >

                          <Download size={16} />

                        </button>

                        <button
                          className="action-btn"
                          onClick={() =>
                            handleDelete(
                              file._id
                            )
                          }
                        >

                          <Trash2 size={16} />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )
            }

          </tbody>

        </table>

      </div>

      {/* Map Section */}
      <div className="map-section">

        <div className="map-bg"></div>

        <div className="status-dots">

          <span className="dot"></span>

          <span className="dot"></span>

          <span className="dot"></span>

        </div>

        <div className="map-content">

          <h3>

            <Globe size={20} />

            Decentralized Mesh Status

          </h3>

          <p>

            14 Active Nodes across
            4 continents ensuring
            0% packet loss.

          </p>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;