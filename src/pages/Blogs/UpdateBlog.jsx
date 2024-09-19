import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Paper } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

const BlogUpdateForm = () => {
  const [title, setTitle] = useState('');
  const [mainDescription, setMainDescription] = useState('');
  const [tagId, setTagId] = useState('');
  const [descriptions, setDescriptions] = useState([{ id: uuidv4(), text: '', images: [] }]);
  const [mainImage, setMainImage] = useState(null);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const [blogId, setBlogId] = useState('');

  useEffect(() => {
    if (location.state && location.state.id) {
      setBlogId(location.state.id);
      console.log("Blog ID:", location.state.id);
      // Fetch existing blog data here if necessary
    } else {
      console.warn("No ID found in location.state");
    }
  }, [location.state]);

  const handleAddDescription = () => {
    setDescriptions([...descriptions, { id: uuidv4(), text: '', images: [] }]);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index].text = value;
    setDescriptions(updatedDescriptions);
  };

  const handleImageChange = (index, event) => {
    const files = Array.from(event.target.files);
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index].images = files;
    setDescriptions(updatedDescriptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
  
    formData.append('lang', lang);
    formData.append('title', title);
    formData.append('main_description', mainDescription);
    formData.append('tag_id', tagId);
    
    if (mainImage) {
      formData.append('main_img', mainImage);
    }
  
    descriptions.forEach((desc, index) => {
      formData.append(`descriptions[${index}][text]`, desc.text);
      desc.images.forEach((image) => {
        formData.append(`descriptions[${index}][img]`, image);
      });
    });
  
    try {
      const response = await axios.put(`${API_URL}/blogs/update/${lang}/${blogId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("Update response:", response.data);
      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      console.error('Error updating blog:', error);
      // Handle error, e.g., show an error message
    }
  };
  

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4">Update Blog</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Main Description"
          fullWidth
          multiline
          rows={4}
          value={mainDescription}
          onChange={(e) => setMainDescription(e.target.value)}
          required
        />
        <TextField
          label="Tag ID"
          fullWidth
          value={tagId}
          onChange={(e) => setTagId(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setMainImage(e.target.files[0])}
          accept="image/*"
          required
        />
        {descriptions.map((desc, index) => (
          <div key={desc.id}>
            <TextField
              label={`Description ${index + 1}`}
              fullWidth
              multiline
              rows={2}
              value={desc.text}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
              required
            />
            <input
              type="file"
              multiple
              onChange={(e) => handleImageChange(index, e)}
              accept="image/*"
            />
          </div>
        ))}
        <Button onClick={handleAddDescription} variant="contained" color="primary">
          Add Description
        </Button>
        <Button type="submit" variant="contained" color="secondary">
          Update Blog
        </Button>
      </form>
    </Paper>
  );
};

export default BlogUpdateForm;
