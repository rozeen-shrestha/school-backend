import React from 'react';
import NewsCard from './NewsCard';

const NewsGrid = ({ newsData }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.map((news) => (
          <div key={news.id} className="h-full">
            <NewsCard
              title={news.title}
              date={news.date}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;
