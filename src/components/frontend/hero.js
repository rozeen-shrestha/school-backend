"use client"

import React, { useState, useEffect } from 'react';

const HERO = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      img: '/api/file/IMG/buildingphoto.png',
      title: 'Learning Today, Leading Tomorrow.',
      description: 'We had such a great time in Education.',
    },
  ];

  
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
         <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.img}
              alt="education"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-8">
              <h1 className="text-3xl md:text-5xl font-bold animate-fadeInLeft">
                {slide.title}
              </h1>
              <p className="mt-4 text-lg">{slide.description}</p>
              <a
                href="/contact"
                className="mt-6 bg-blue-800 hover:bg-blue-600 text-white py-2 px-6 rounded shadow transition duration-300"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-r hover:bg-gray-700"
        onClick={handlePrev}
      >
        ❮
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-l hover:bg-gray-700"
        onClick={handleNext}
      >
        ❯
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default HERO;
