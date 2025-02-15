"use client";

import React, { useEffect, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LanguageContext } from '@/components/LanguageContext';

const OURSERVICES = () => {
  const { language } = useContext(LanguageContext); // Access the current language

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const services = [
    {
      title: { en: 'Bus Service', np: 'बस सेवा' },
      description: {
        en: 'Safe and reliable transportation for students.',
        np: 'विद्यार्थीहरूको लागि सुरक्षित र भरपर्दो यातायात सेवा।',
      },
      image: 'https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg',
    },
    {
      title: { en: 'Library', np: 'पुस्तकालय' },
      description: {
        en: 'A vast collection of books and resources for students.',
        np: 'विद्यार्थीहरूको लागि किताब र स्रोतहरूको ठूलो सङ्ग्रह।',
      },
      image: 'https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg',
    },
    {
      title: { en: 'Laboratories', np: 'प्रयोगशाला' },
      description: {
        en: 'Well-equipped labs for practical learning.',
        np: 'व्यावहारिक सिकाइका लागि राम्रोसँग सुसज्जित प्रयोगशालाहरू।',
      },
      image: 'https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg',
    },
    {
      title: { en: 'Hostel', np: 'होस्टल' },
      description: {
        en: 'Comfortable and secure accommodation for students.',
        np: 'विद्यार्थीहरूको लागि आरामदायक र सुरक्षित आवास।',
      },
      image: 'https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg',
    },
    {
      title: { en: 'Cafeteria', np: 'क्याफेटेरिया' },
      description: {
        en: 'Healthy and delicious meals for students and staff.',
        np: 'विद्यार्थीहरू र कर्मचारीहरूको लागि स्वस्थ र स्वादिलो खाना।',
      },
      image: 'https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg',
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <h2
          className="text-4xl font-bold text-center text-blue-900 mb-8"
          data-aos="fade-down"
        >
          {language === 'en' ? 'Our Services' : 'हाम्रो सेवाहरू'} {/* Heading translation */}
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          data-aos="fade-up"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              data-aos="zoom-in"
            >
              <div className="relative w-full h-48">
                <img
                  src={service.image}
                  alt={service.title[language]} // Image alt text based on language
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-900 transition-colors duration-300">
                  {service.title[language]} {/* Title translation */}
                </h3>
                <p className="text-gray-600 mt-2">{service.description[language]}</p> {/* Description translation */}
                <button className="mt-4 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  {language === 'en' ? 'Learn More' : 'थप जानकारी'} {/* Button text translation */}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OURSERVICES;
