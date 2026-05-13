import React, {
  useState,
  useEffect
} from "react";

import API from "../api/axios";

function Files() {

  // Selected File
  const [selectedFile, setSelectedFile] =
    useState(null);

  // All Files
  const [files, setFiles] = useState([]);

  // Fetch Files
  const fetchFiles = async () => {

    try {

      // Get Logged In User
      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      let res;

      // ADMIN -> ALL FILES
      if(user?.role === "admin") {

        res = await API.get(
          "/files/all-files"
        );

      }

      // NORMAL USER -> OWN FILES
      else {

        res = await API.get(
          "/files"
        );

      }

      console.log(
        "FILES DATA:",
        res.data
      );

      // Set Files
      setFiles(

        Array.isArray(res.data)
          ? res.data
          : res.data.files || []

      );

    } catch (err) {

      console.log(err);

    }

  };

  // Run On Page Load
  useEffect(() => {

    fetchFiles();

  }, []);

  // Upload File
  const handleUpload = async () => {

    if (!selectedFile) {

      alert("Select File First");

      return;

    }

    const formData = new FormData();

    formData.append(
      "file",
      selectedFile
    );

    try {

      await API.post(

        "/files/upload",

        formData,

        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }

      );

      alert("File Uploaded");

      // Refresh Files List
      fetchFiles();

    } catch (err) {

      console.log(err);

      alert("Upload Failed");

    }

  };

  // Download File
  const handleDownload = async (file) => {

    try {

      const response = await API.get(

        `/files/download/${file._id}`,

        {
          responseType: "blob"
        }

      );

      // Create File URL
      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      // Create Download Link
      const link =
        document.createElement("a");

      link.href = url;

      // Original File Name
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

  return (

    <div style={{ padding: "40px" }}>

      {/* Title */}
      <h1
        style={{
          color: "white",
          marginBottom: "30px"
        }}
      >
        Secure File Upload
      </h1>

      {/* File Input */}
      <input
        type="file"
        onChange={(e) =>
          setSelectedFile(
            e.target.files[0]
          )
        }
      />

      <br /><br />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        style={{
          padding: "12px 20px",
          background: "#8b92ff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Upload Secure File
      </button>

      <br /><br /><br />

      {/* Uploaded Files */}
      <h2 style={{ color: "white" }}>
        Uploaded Files
      </h2>

      <br />

      {
        files.length === 0 ? (

          <p style={{ color: "gray" }}>
            No Files Uploaded
          </p>

        ) : (

          files.map((file) => (

            <div
              key={file._id}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #2d325a",
                borderRadius: "12px",
                background: "#11162b",
                color: "white"
              }}
            >

              {/* File Name */}
              <p
                style={{
                  marginBottom: "10px"
                }}
              >
                📄 {
                  file.originalname ||
                  file.filename
                }
              </p>

              {/* Show User Name For Admin */}
              {
                JSON.parse(
                  localStorage.getItem("user")
                )?.role === "admin" && (

                  <p
                    style={{
                      color: "#8b92ff",
                      marginBottom: "10px"
                    }}
                  >

                    Uploaded By:
                    {" "}
                    {
                      file.uploadedBy?.email ||
                      "Unknown User"
                    }

                  </p>

                )
              }

              {/* Download Button */}
              <button
                onClick={() =>
                  handleDownload(file)
                }
                style={{
                  padding: "10px 16px",
                  background: "#8b92ff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Download File
              </button>

            </div>

          ))

        )
      }

    </div>

  );

}

export default Files;