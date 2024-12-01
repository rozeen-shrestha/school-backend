"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ProgramPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [activeSection, setActiveSection] = useState("Introduction");

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
    });
  }, []);

  const programs = [
    {
      id: 1,
      title: "+2 Science",
      image: "/api/file/Logo.jpg",
      sections: {
        Introduction:
          "This is the introduction for the +2 Science program. It focuses on building foundational knowledge in physics, chemistry, and biology.",
        "Admission Requirements":
          "The admission requirements include a minimum GPA of 2.5 in SEE or equivalent, along with an entrance exam.",
        "Admission Procedures":
          "The admission procedure involves filling out an application form, submitting necessary documents, and appearing for the entrance test.",
        "Course Composition":
          "The course composition includes core subjects like Physics, Chemistry, and Biology, and optional subjects based on interest.",
      },
    },
    {
      id: 2,
      title: "+2 Management",
      image: "/api/file/Logo.jpg",
      sections: {
        Introduction:
          "The +2 Management program introduces students to business studies and economics, preparing them for careers in management.",
        "Admission Requirements":
          "A minimum GPA of 2.0 in SEE or equivalent is required, along with an interview.",
        "Admission Procedures":
          "Fill out an application, submit required documents, and attend an interview for admission.",
        "Course Composition":
          "The curriculum includes Business Studies, Economics, and Accounting as core subjects.",
      },
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <div className="py-12 px-4 sm:px-6 lg:px-8"></div>
      <div className="container mx-auto flex-grow px-4 sm:px-6 lg:px-8 py-10">
        {!selectedProgram ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            data-aos="fade-up"
          >
            {programs.map((program, index) => (
              <div
                key={program.id}
                className="cursor-pointer"
                onClick={() => setSelectedProgram(program)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h5 className="text-lg font-semibold">{program.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 border rounded-lg shadow-md" data-aos="fade-in">
            <button
              onClick={() => setSelectedProgram(null)}
              className="text-white bg-blue-900 px-4 py-2 rounded-lg mb-4"
              data-aos="zoom-in"
            >
              Back
            </button>

            <h2 className="text-2xl font-bold mb-4">{selectedProgram.title}</h2>

            <div className="grid grid-cols-12 gap-4">
              <div
                className="col-span-4 md:col-span-3"
                data-aos="slide-right"
                data-aos-delay="200"
              >
                <div className="flex flex-col gap-2">
                  {Object.keys(selectedProgram.sections).map((section) => (
                    <button
                      key={section}
                      className={`text-left px-4 py-2 rounded-lg ${
                        activeSection === section
                          ? "bg-blue-900 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                      onClick={() => setActiveSection(section)}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-8 md:col-span-9" data-aos="fade-in">
                <div className="p-4 border rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">{activeSection}</h3>
                  <p>{selectedProgram.sections[activeSection]}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramPage;