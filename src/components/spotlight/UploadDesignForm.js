import React, { useState } from 'react';

const UploadDesignForm = ({ onAddDesign }) => {
  const [title, setTitle] = useState('');
  const [designer, setDesigner] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDesign = {
      id: Date.now(),
      title,
      designer,
      description,
      votes: 0,
      comments: [],
      shares: 0,
      image,
    };
    onAddDesign(newDesign);
    setTitle('');
    setDesigner('');
    setDescription('');
    setImage(null);
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
      }}
    >
      <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Upload Your Design</h2>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />
      </label>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Designer:
        <input
          type="text"
          value={designer}
          onChange={(e) => setDesigner(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />
      </label>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            minHeight: '100px',
          }}
        />
      </label>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Image:
        <input type="file" onChange={handleImageUpload} />
      </label>
      {image && <img src={image} alt="Design preview" style={{ display: 'block', maxWidth: '100%', marginBottom: '10px' }} />}
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          backgroundColor: '#ff0066',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Upload Design
      </button>
    </form>
  );
};

export default UploadDesignForm;
