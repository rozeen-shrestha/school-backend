"use client";

import React, { useState, useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "@/components/LanguageContext";

const ProgramPage = () => {
  const { language } = useContext(LanguageContext); // Access the current language
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
      title: { en: "+2 Science", np: "+२ विज्ञान" },
      image: "/api/file/Logo.jpg",
      sections: {
        Introduction: {
          en: "This is the introduction for the +2 Science program. It focuses on building foundational knowledge in physics, chemistry, and biology.",
          np: "यो +२ विज्ञान कार्यक्रमको परिचय हो। यसले भौतिकी, रसायनशास्त्र र जैविक विज्ञानमा आधारभूत ज्ञान निर्माणमा ध्यान केन्द्रित गर्दछ।",
        },
        "Admission Requirements": {
          en: "The admission requirements include a minimum GPA of 2.5 in SEE or equivalent, along with an entrance exam.",
          np: "भर्ना आवश्यकतामा SEE वा समकक्षमा कम्तीमा २.५ GPA र एक प्रवेश परीक्षा समावेश छ।",
        },
        "Admission Procedures": {
          en: "The admission procedure involves filling out an application form, submitting necessary documents, and appearing for the entrance test.",
          np: "भर्ना प्रक्रिया आवेदन फारम भर्नु, आवश्यक कागजात पेश गर्नु, र प्रवेश परीक्षामा सहभागी हुनु पर्छ।",
        },
        "Course Composition": {
          en: "The course composition includes core subjects like Physics, Chemistry, and Biology, and optional subjects based on interest.",
          np: "कोर्स संरचनामा भौतिकी, रसायनशास्त्र र जैविक विज्ञान जस्ता मुख्य विषयहरू र चासोको आधारमा वैकल्पिक विषयहरू समावेश छन्।",
        },
      },
    },
    {
      id: 2,
      title: { en: "+2 Management", np: "+२ व्यवस्थापन" },
      image: "/api/file/Logo.jpg",
      sections: {
        Introduction: {
          en: "The +2 Management program introduces students to business studies and economics, preparing them for careers in management.",
          np: "+२ व्यवस्थापन कार्यक्रमले विद्यार्थीहरूलाई व्यापार अध्ययन र अर्थशास्त्रमा परिचय गराउँछ, जसले तिनीहरूलाई व्यवस्थापनमा क्यारियरको लागि तयारी गर्दछ।",
        },
        "Admission Requirements": {
          en: "A minimum GPA of 2.0 in SEE or equivalent is required, along with an interview.",
          np: "SEE वा समकक्षमा कम्तीमा २.० GPA र एक अन्तर्वार्ता आवश्यक छ।",
        },
        "Admission Procedures": {
          en: "Fill out an application, submit required documents, and attend an interview for admission.",
          np: "आवेदन भर्नुहोस्, आवश्यक कागजात पेश गर्नुहोस्, र भर्नाको लागि अन्तर्वार्ता दिनुहोस्।",
        },
        "Course Composition": {
          en: "The curriculum includes Business Studies, Economics, and Accounting as core subjects.",
          np: "पाठ्यक्रममा व्यापार अध्ययन, अर्थशास्त्र र लेखा मुख्य विषयको रूपमा समावेश छन्।",
        },
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
                    alt={program.title[language]}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h5 className="text-lg font-semibold">{program.title[language]}</h5>
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
              {language === "en" ? "Back" : "पछाडि"}
            </button>

            <h2 className="text-2xl font-bold mb-4">{selectedProgram.title[language]}</h2>

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
                      {section === "Introduction"
                        ? language === "en"
                          ? "Introduction"
                          : "परिचय"
                        : section === "Admission Requirements"
                        ? language === "en"
                          ? "Admission Requirements"
                          : "भर्ना आवश्यकताहरू"
                        : section === "Admission Procedures"
                        ? language === "en"
                          ? "Admission Procedures"
                          : "भर्ना प्रक्रिया"
                        : section === "Course Composition"
                        ? language === "en"
                          ? "Course Composition"
                          : "कोर्स संरचना"
                        : section}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-8 md:col-span-9" data-aos="fade-in">
                <div className="p-4 border rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">{activeSection}</h3>
                  <p>{selectedProgram.sections[activeSection][language]}</p>
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
