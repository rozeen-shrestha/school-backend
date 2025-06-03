import React from 'react';
import { Card } from '@/components/ui/card';

const SCHOOL_LOGO = '/school-logo.png';

const NewsCard = ({ title, date, images }) => {
  // Always use /api/file as prefix for news images
  const imageSrc =
    images && images.length > 0
      ? `/api/file${images[0].startsWith('/') ? images[0] : '/' + images[0]}`
      : SCHOOL_LOGO;

  // Handle invalid or missing date
  let formattedDate = '';
  if (date) {
    const d = new Date(date);
    formattedDate = isNaN(d.getTime())
      ? ''
      : d.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
  }

  return (
    <Card className="w-full h-full bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
      <div className="flex flex-col h-full">
        {/* Image Section */}
        <div className="w-full h-48 relative">
          <img
            src={imageSrc}
            alt="News thumbnail"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:line-clamp-none transition-all duration-300">
              {title}
            </h3>
          </div>

          <div className="text-sm text-gray-600 mt-2">
            {formattedDate}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
