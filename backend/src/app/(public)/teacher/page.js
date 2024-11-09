// ./src/app/teachers/page.js
"use client";
import React from 'react';
import TeacherCard from "@/components/frontend/TeacherCard";

export default function TeachersPage() {
  const teachers = [
    {
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      description: "Dr. Johnson has been teaching advanced mathematics for over 15 years, specializing in calculus and number theory.",
      imageUrl: "https://www.saraswatidamak.edu.np/media/2018/05/bha.jpg",
      socials: {
        email: "sarah.johnson@school.com",
        facebook: "https://facebook.com/sarahjohnson",
        instagram: "https://instagram.com/drsarah"
      }
    },
    {
      name: "Prof. Michael Chen",
      subject: "Physics",
      description: "An expert in quantum mechanics with a passion for making complex concepts accessible to all students.",
      imageUrl: "/teachers/michael-chen.jpg",
      socials: {
        email: "michael.chen@school.com"
      }
    },
    {
      name: "Ms. Emily Rodriguez",
      subject: "Literature",
      description: "Bringing classic and contemporary literature to life through innovative teaching methods and interactive discussions.",
      imageUrl: "/teachers/emily-rodriguez.jpg",
      socials: {
        instagram: "https://instagram.com/emilyreads",
        email: "emily.rodriguez@school.com"
      }
    },
    {
      name: "Ms. Emily Rodriguez",
      subject: "Literature",
      description: "Bringing classic and contemporary literature to life through innovative teaching methods and interactive discussions.",
      imageUrl: "/teachers/emily-rodriguez.jpg",
      socials: {
        instagram: "https://instagram.com/emilyreads",
        email: "emily.rodriguez@school.com"
      }
    },
    {
      name: "Ms. Emily Rodriguez",
      subject: "Literature",
      description: "Bringing classic and contemporary literature to life through innovative teaching methods and interactive discussions.",
      imageUrl: "/teachers/emily-rodriguez.jpg",
      socials: {
        instagram: "https://instagram.com/emilyreads",
        email: "emily.rodriguez@school.com"
      }
    },
    {
      name: "Ms. Emily Rodriguez",
      subject: "Literature",
      description: "Bringing classic and contemporary literature to life through innovative teaching methods and interactive discussions.",
      imageUrl: "/teachers/emily-rodriguez.jpg",
      socials: {
        instagram: "https://instagram.com/emilyreads",
        email: "emily.rodriguez@school.com"
      }
    }
  ];

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Title with decorative background */}
            <div className="relative mb-12 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
              <h1 className="relative text-4xl font-bold text-gray-900 mb-2">Our Teachers</h1>
              <p className="relative text-gray-600">Meet our exceptional faculty members</p>
            </div>

            {/* Teacher cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teachers.map((teacher) => (
                <TeacherCard
                  key={teacher.name}
                  name={teacher.name}
                  subject={teacher.subject}
                  description={teacher.description}
                  imageUrl={teacher.imageUrl}
                  socials={teacher.socials}
                />
              ))}
            </div>
          </div>
          </div>
        </div>
    </>
  );
}
