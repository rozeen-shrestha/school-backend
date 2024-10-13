'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import FileUploadArea from '@/components/media/fileuploadarea';
import { Button as UIButton } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteImage, setDeleteImage] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [deleteCategoryOpen, setDeleteCategoryOpen] = useState(false);

  const fileInputRef = useRef(null);

  // Fetch categories and trigger the update API
  const fetchCategories = async () => {
    setLoading(true);
    try {
      await axios.post('/api/media/photo/category/update');
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

  // After upload is complete, close the dialog and re-fetch categories
  const handleUploadComplete = () => {
    setIsDialogOpen(false);
    fetchCategories();
  };

  // Open the dialog for adding images to a specific category
  const openDialogWithCategory = (category) => {
    setCategory(category);
    setIsDialogOpen(true);
  };

  // Open confirmation dialog for deletion
  const handleDeleteClick = (imageName, categoryId) => {
    setDeleteImage(imageName);
    setDeleteCategoryId(categoryId);
    setConfirmDeleteOpen(true);
  };

  // Confirm delete image handler
  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete('/api/media/photo/delete', {
        data: { imageName: deleteImage },
      });
      await axios.post('/api/media/photo/category/update', { categoryId: deleteCategoryId });
      fetchCategories();
    } catch (error) {
      console.error('Error during delete or update:', error);
    } finally {
      setDeleteLoading(false);
      setConfirmDeleteOpen(false);
      setDeleteImage(null);
      setDeleteCategoryId(null);
    }
  };

  // Cancel delete action
  const cancelDelete = () => {
    setConfirmDeleteOpen(false);
    setDeleteImage(null);
    setDeleteCategoryId(null);
  };

  // Add a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/media/photo/category', { category: newCategory });
      setNewCategory('');
      setIsDialogOpen(false);
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  // Open confirmation dialog for deleting category
  const handleDeleteCategoryClick = (categoryId) => {
    setDeleteCategoryId(categoryId);
    setDeleteCategoryOpen(true);
  };

  // Confirm delete category handler
  const confirmDeleteCategory = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete('/api/media/photo/category/update', {
        data: { categoryId: deleteCategoryId },
      });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setDeleteLoading(false);
      setDeleteCategoryOpen(false);
      setDeleteCategoryId(null);
    }
  };

  // Cancel delete category action
  const cancelDeleteCategory = () => {
    setDeleteCategoryOpen(false);
    setDeleteCategoryId(null);
  };

  return (
    <div className='w-full'>
      <div className="flex justify-start mb-4 space-x-4">
        {/* Add Category Button */}
        <UIButton
          onClick={() => openDialogWithCategory('')}
          className="category-button"
          aria-label="Add new category"
        >
          Add Category
        </UIButton>

        {/* Refresh Button */}
        <UIButton
          onClick={fetchCategories}
          className="category-button"
          aria-label="Refresh categories"
        >
          Refresh
        </UIButton>
      </div>

      {loading && <p>Loading categories...</p>}
      {error && <p>Error fetching categories: {error}</p>}

      {!loading && !error && categories.map((cat) => (
        <div key={cat._id} className="category-section">
          <div className="flex justify-between items-center">
            <h2>{cat.name}</h2>
            <div className="flex space-x-4">
              <UIButton
                onClick={() => openDialogWithCategory(cat.name)}
                className="category-button m-4"
                aria-label={`Upload file to ${cat.name}`}
              >
                Add New Image
              </UIButton>
              <UIButton
                onClick={() => handleDeleteCategoryClick(cat._id)}
                className="category-button m-4"
                aria-label={`Delete ${cat.name}`}
                color="red"
              >
                Delete Category
              </UIButton>
            </div>
          </div>
          <Separator />
          <div className="image-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.uploads && cat.uploads.map((upload) => (
              <Card key={upload._id} sx={{ maxWidth: 345, marginBottom: 2 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={upload.path ? `/api/file${upload.path}` : 'default-image-path.jpg'}
                    alt={upload.originalFilename || 'Image'}
                  />
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    sx={{ flex: 1 }}
                    onClick={() => handleDeleteClick(upload.filename, cat._id)}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? 'Deleting...' : 'Delete'}
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
          <Separator />
        </div>
      ))}

      {/* Confirmation Dialog for Deletion */}
      <Dialog open={confirmDeleteOpen} onOpenChange={cancelDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this image?</p>
          <div className="flex justify-end space-x-4">
            <UIButton onClick={cancelDelete} variant="outlined">Cancel</UIButton>
            <UIButton onClick={confirmDelete} color="red">Delete</UIButton>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Deleting Category */}
      <Dialog open={deleteCategoryOpen} onOpenChange={cancelDeleteCategory}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete Category</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this category and all its images?</p>
          <div className="flex justify-end space-x-4">
            <UIButton onClick={cancelDeleteCategory} variant="outlined">Cancel</UIButton>
            <UIButton onClick={confirmDeleteCategory} color="red">Delete</UIButton>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{category ? `Upload a new file to ${category}` : 'Add a new category'}</DialogTitle>
          </DialogHeader>
          {category ? (
            <FileUploadArea
              api='/api/media/photo/upload'
              onUploadComplete={handleUploadComplete}
              category={category}
            />
          ) : (
            <form onSubmit={handleAddCategory}>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
                required
                className="input"
              />
              <UIButton type="submit" className="category-button">
                Add Category
              </UIButton>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
