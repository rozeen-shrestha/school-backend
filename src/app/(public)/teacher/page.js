"use client";
import React, { useEffect, useState } from 'react';
import TeacherCard from "@/components/frontend/TeacherCard";
import { Separator } from "@/components/ui/separator";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 400,
      once: false,
      mirror: false,
      offset: 0,
      disable: 'mobile'
    });

    const fetchTeachers = async () => {
      try {
        const response = await axios.get('/api/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Transform API data to match component needs
  const transformedTeachers = teachers.map(teacher => ({
    name: `${teacher.firstName} ${teacher.lastName}`,
    subject: teacher.subject,
    description: teacher.description,
    imageUrl: `/api/file${teacher.photoUrl}`,
    socials: {
      ...(teacher.email && { email: teacher.email }),
      ...(teacher.facebook && { facebook: teacher.facebook }),
      ...(teacher.instagram && { instagram: teacher.instagram })
    }
  }));

  // Group teachers by subject
  const groupedTeachers = transformedTeachers.reduce((acc, teacher) => {
    if (!acc[teacher.subject]) {
      acc[teacher.subject] = [];
    }
    acc[teacher.subject].push(teacher);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-12 text-center" data-aos="fade-down">
            <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
            <h1 className="relative text-4xl font-bold text-gray-900 mb-2">Our Teachers</h1>
            <p className="relative text-gray-600">Meet our exceptional faculty members</p>
          </div>

          {Object.entries(groupedTeachers).map(([subject, subjectTeachers], index) => (
            <div key={subject} className="mb-12">
              <div className="flex items-center gap-4 mb-8" data-aos="fade-up">
                <Separator className="flex-1" />
                <h2 className="text-2xl font-semibold text-gray-700">{subject}</h2>
                <Separator className="flex-1" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {subjectTeachers.map((teacher, teacherIndex) => (
                  <div
                    key={`${teacher.name}-${teacherIndex}`}
                    data-aos="fade-up"
                    data-aos-delay={teacherIndex * 100}
                  >
                    <TeacherCard {...teacher} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
