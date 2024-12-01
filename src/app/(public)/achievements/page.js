"use client"

import React from 'react';

const page = () => {
  const achievements = [
    {
      title: 'Academic Excellence',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s', // Replace with your actual image paths
      description:
        'Top results in board exams for consecutive years with a focus on holistic education.',
    },
    {
      title: 'Sports Championship',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s',
      description:
        'Winners of inter-school competitions with stellar performances in athletics and team sports.',
    },
    {
      title: 'Science Fair Winner',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s',
      description:
        'Innovative projects that made headlines, including renewable energy models.',
    },
    {
      title: 'Debate Champion',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s',
      description:
        'Nationwide debating competition champions for three consecutive years.',
    },
    {
      title: 'Art Showcase',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s',
      description:
        'Top awards in creative arts, from painting to digital design.',
    },
    {
      title: 'Community Service',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s',
      description:
        'Impactful volunteering initiatives and social awareness campaigns.',
    },
  ];

  return (
    <div className="bg-white text-gray-800">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                  {achievement.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
