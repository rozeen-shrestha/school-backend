"use client";

import React, { useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "@/components/LanguageContext"; // Import the LanguageContext

const page = () => {
  const { language } = useContext(LanguageContext); // Access the language from context

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      once: false,
    });
  }, []);

  const services = [
    {
      title: {
        en: "Laboratories",
        np: "प्रयोगशाला",
      },
      description: {
        en:
          "The school has separate laboratories for Physics, Chemistry, Biology, and Computer Science. All labs are equipped with modern facilities, ensuring the best environment for practical learning.",
        np:
          "स्कूलमा भौतिकी, रसायन, जीवविज्ञान र कम्प्युटर विज्ञानका लागि पृथक प्रयोगशालाहरू छन्। सबै प्रयोगशालाहरू आधुनिक सुविधाहरूसँग सुसज्जित छन्, जसले व्यावहारिक अध्ययनको लागि उत्कृष्ट वातावरण सुनिश्चित गर्दछ।",
      },
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s",
    },
    {
      title: {
        en: "Transportation",
        np: "परिवहन",
      },
      description: {
        en:
          "Our fleet of school buses is safe, reliable, and well-maintained, providing fixed routes for smooth commutes to and from the school.",
        np:
          "हाम्रो स्कूलको बसहरूको बेड़ा सुरक्षित, भरपर्दो र राम्रोसँग मर्मत गरिएको छ, जसले स्कूलमा र स्कूलबाट जाने लागि निश्चित मार्गहरू प्रदान गर्दछ।",
      },
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s",
    },
    {
      title: {
        en: "Library",
        np: "पुस्तकालय",
      },
      description: {
        en:
          "The school library offers a wide collection of books, journals, and digital resources to encourage research and learning.",
        np:
          "स्कूल पुस्तकालयले पुस्तकहरू, जर्नलहरू र डिजिटल स्रोतहरूको एक विस्तृत सङ्ग्रह प्रदान गर्दछ, जसले अनुसन्धान र अध्ययनलाई प्रोत्साहन दिन्छ।",
      },
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s",
    },
    {
      title: {
        en: "Hostel",
        np: "होस्टेल",
      },
      description: {
        en:
          "Our hostel facilities provide a safe, clean, and comfortable environment for students to reside in.",
        np:
          "हाम्रो होस्टेल सुविधाहरूले विद्यार्थीहरूको बसोबासको लागि सुरक्षित, सफा, र आरामदायक वातावरण प्रदान गर्दछ।",
      },
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s",
    },
    {
      title: {
        en: "Cafeteria",
        np: "क्याफेटेरिया",
      },
      description: {
        en:
          "The cafeteria serves hygienic and nutritious meals, offering a variety of options for students and staff.",
        np:
          "क्याफेटेरिया स्वच्छ र पौष्टिक भोजनहरू प्रदान गर्दछ, जसले विद्यार्थीहरू र कर्मचारीहरूका लागि विभिन्न विकल्पहरू प्रदान गर्दछ।",
      },
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s",
    },
  ];

  return (
    <div>
      <section className="py-16 px-8 md:px-24 bg-gray-100">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
          {language === "en" ? "Our Services" : "हाम्रो सेवाहरू"}
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
                alt={language === "en" ? service.title.en : service.title.np}
                className="w-3/4 md:w-1/3 rounded-lg shadow-lg"
                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
              />
              <div
                className="md:w-1/2 md:pl-16 mt-6 md:mt-0 text-center md:text-left"
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <h3 className="text-3xl font-bold text-blue-900 mb-4">
                  {language === "en" ? service.title.en : service.title.np}
                </h3>
                <p className="text-gray-700">
                  {language === "en" ? service.description.en : service.description.np}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
