'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider, Typography, Dialog, DialogContent } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

const List = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch categories and images
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/media/photo/category');
      setCategories(response.data);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className='w-full'>
      {loading && <p>Loading categories...</p>}
      {error && <p>Error fetching categories: {error}</p>}

      {!loading && !error && categories.map((cat) => (
        <div key={cat._id} className="category-section">
          <div className="flex justify-between items-center">
            <Typography variant="h4">{cat.name}</Typography>
          </div>
          <Divider />
          <div className="image-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.uploads && cat.uploads.map((upload) => (
              <Card key={upload._id} sx={{ marginBottom: 2 }}>
                <CardActionArea onClick={() => handleClickOpen(upload.path)} sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    image={upload.path || 'default-image-path.jpg'}
                    alt={upload.originalFilename || 'Image'}
                    sx={{ objectFit: 'cover', height: '100%' }}
                  />
                </CardActionArea>
              </Card>
            ))}
          </div>
          <Divider />
        </div>
      ))}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          {selectedImage && (
            <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto' }} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default List;
