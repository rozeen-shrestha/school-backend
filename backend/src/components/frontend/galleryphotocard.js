'use client'
import React, { useState } from 'react';

const GalleryPhotoCard = ({ imageUrl }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>
      <div
        className="aspect-square w-full overflow-hidden cursor-pointer
                   transition-all duration-300 hover:scale-105 relative"
        onClick={() => setIsFullScreen(true)}
      >
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {isFullScreen && (
        <div
          className="fixed inset-0 bg-black/90 z-50
                     flex items-center justify-center"
          onClick={() => setIsFullScreen(false)}
        >
          <img
            src={imageUrl}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </>
  );
};

export default GalleryPhotoCard;
