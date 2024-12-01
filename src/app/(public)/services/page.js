"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const page = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: "ease-out", 
      once: false, 
    });
  }, []);

  const services = [
    {
      title: "Laboratories",
      description:
        "The school has separate laboratories for Physics, Chemistry, Biology, and Computer Science. All labs are equipped with modern facilities, ensuring the best environment for practical learning.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s", 
    },
    {
      title: "Transportation",
      description:
        "Our fleet of school buses is safe, reliable, and well-maintained, providing fixed routes for smooth commutes to and from the school.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s",
    },
    {
      title: "Library",
      description:
        "The school library offers a wide collection of books, journals, and digital resources to encourage research and learning.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s",
    },
    {
      title: "Hostel",
      description:
        "Our hostel facilities provide a safe, clean, and comfortable environment for students to reside in.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s", 
    },
    {
      title: "Cafeteria",
      description:
        "The cafeteria serves hygienic and nutritious meals, offering a variety of options for students and staff.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s",
    },
  ];

  return (
    <div>
      <section className="py-16 px-8 md:px-24 bg-gray-100">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
          Our Services
        </h2>
        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center md:justify-center`}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-3/4 md:w-1/3 rounded-lg shadow-lg"
                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
              />
              <div
                className="md:w-1/2 md:pl-16 mt-6 md:mt-0 text-center md:text-left"
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <h3 className="text-3xl font-bold text-blue-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
