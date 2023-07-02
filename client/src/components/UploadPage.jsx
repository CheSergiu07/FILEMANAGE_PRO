import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedClassDirectory, setSelectedClassDirectory] = useState("CL5");

  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const onClassDirectoryChange = event => {
    setSelectedClassDirectory(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('classDirectory', selectedClassDirectory);

    axios.post('http://localhost:3001/upload', formData)
      .then(response => {
        alert(response.data.message);
        window.location.reload();
      })
      .catch(error => {
        console.error('An error occurred while uploading the file:', error);
      });
  };

  const handleUploadButtonClick = () => {
    fetch('/upload')
        .then(response => response.text())
        .then(data => {
            console.log(data);
        });
};

    // Restul codului (downloadFile, deleteFile, etc.)
  // ...

  return (
    <div>
      <h2>Încărcare fișier</h2>
      <form onSubmit={onSubmit}>
        <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg" multiple onChange={onFileChange} />
        <select name="classDirectory" onChange={onClassDirectoryChange}>
          <option value="CL5">CL5</option>
          {/* Restul opțiunilor */}
        </select>
        <input type="submit" value="Upload" />
      </form>
      <button onClick={handleUploadButtonClick}>Upload</button>
      {/* Restul codului HTML pentru afișarea listei de fișiere */}
    </div>
  );
};

export default UploadPage;
