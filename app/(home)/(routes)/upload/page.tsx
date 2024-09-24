"use client";
import { useState, ChangeEvent } from "react";
import axios from "axios";

const SingleFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
    setUploadStatus("");
    setImageUrl("");
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      const fileType = selectedFile.type;

      // Step 1: Request pre-signed URL from the backend
      const response = await axios.post(
        "http://localhost:3000/api/presigned-url/generate",
        {
          fileType: fileType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to get pre-signed URL");
      }

      console.log(response);

      const { uploadUrl, downloadUrl } = await response.data;

      console.log(uploadUrl, downloadUrl);

      // Step 2: Upload the file to the pre-signed URL

      const options = {
        headers: {
          "Content-Type": fileType,
        },
      };

      await axios.put(uploadUrl, selectedFile, options);

      setUploadStatus("File uploaded successfully!");
    } catch (error) {
      console.error("Error during file upload:", error);
      setUploadStatus("File upload failed");
    }
  };

  return (
    <div>
      <h2>Single File Upload</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={!selectedFile}>
        Upload Image
      </button>

      {uploadStatus && <p>{uploadStatus}</p>}

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={imageUrl}
            alt="Uploaded file"
            style={{ maxWidth: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default SingleFileUpload;
