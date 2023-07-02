import React from 'react';

function UploadButton({ handleUpload }) {
  return (
    <button onClick={handleUpload}>Upload</button>
  );
}

export default UploadButton;
