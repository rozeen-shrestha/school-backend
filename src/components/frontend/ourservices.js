"use client"

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OURSERVICES = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  const services = [
    {
      title: 'Bus Service',
      description: 'Safe and reliable transportation for students.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s', 
    },
    {
      title: 'Library',
      description: 'A vast collection of books and resources for students.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s', 
    },
    {
      title: 'Laboratories',
      description: 'Well-equipped labs for practical learning.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s', 
    },
    {
      title: 'Hostel',
      description: 'Comfortable and secure accommodation for students.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s', 
    },
    {
      title: 'Cafeteria',
      description: 'Healthy and delicious meals for students and staff.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s', 
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <h2
          className="text-4xl font-bold text-center text-blue-900 mb-8"
          data-aos="fade-down"
        >
          Our Services
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
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-900 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
                <button className="mt-4 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Learn More
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
