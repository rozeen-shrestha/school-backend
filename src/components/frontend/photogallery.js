'use client'
import React from 'react';
import GalleryPhotoCard from './galleryphotocard';


const PhotoGallery = ({ images }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <GalleryPhotoCard
            key={index}
            imageUrl={image.url}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
