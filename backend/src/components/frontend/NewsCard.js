import React from 'react';
import { Card } from '@/components/ui/card';

const NewsCard = ({ title, date }) => {
  return (
    <Card className="w-full h-full bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
      <div className="flex flex-col h-full">
        {/* Image Section */}
        <div className="w-full h-48 relative">
          <img
            src="https://giwmscdnone.gov.np/static/assets/image/Emblem_of_Nepal.png"
            alt="News thumbnail"
            className="w-full h-full object-cover"
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
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
