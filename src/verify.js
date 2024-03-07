import React, { useState } from 'react';
import axios from 'axios';

function Verify() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const uploadAndOCR = async () => {
    if (!image) {
      console.error('Please select an image file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post('/api/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(response.data.text);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h1>Image Upload and OCR Verification</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={uploadAndOCR}>Upload and OCR</button>
      <div>{result}</div>
    </div>
  );
}

export default Verify;
