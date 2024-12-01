'use client'
import React, { useContext } from 'react';
import { LanguageContext } from '@/components/LanguageContext'; // Assuming you have the same context setup

const VISION = () => {
  const { language } = useContext(LanguageContext); // Getting the language from context

  const translations = {
    en: {
      heading: "School's Vision",
      paragraph1: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.",
      paragraph2: "Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam rebum amet diam ipsum. Clita clita labore, dolor duo nonumy clita sit at, sed sit sanctus dolor eos, ipsum labore duo duo sit no sea diam. Et dolor et kasd ea. Eirmod diam at dolor est vero nonumy magna.",
      readMore: "Read More",
      ceoName: "John Doe",
      ceoTitle: "CEO & Founder",
      altText: "Kids Image"
    },
    np: {
      heading: "विद्यालयको दृष्टिकोण",
      paragraph1: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.",
      paragraph2: "Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam rebum amet diam ipsum. Clita clita labore, dolor duo nonumy clita sit at, sed sit sanctus dolor eos, ipsum labore duo duo sit no sea diam. Et dolor et kasd ea. Eirmod diam at dolor est vero nonumy magna.",
      readMore: "थप पढ्नुहोस्",
      ceoName: "जोन डो",
      ceoTitle: "CEO & संस्थापक",
      altText: "Kids Image"
    }
  };

  return (
    <div>
      <section className="cultural-activities py-12">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-section">
            <h2 className="text-4xl font-bold mb-4 text-blue-800">{translations[language].heading}</h2>
            <p className="text-lg mb-6 text-black">{translations[language].paragraph1}</p>
            <p className="text-lg mb-6 text-black">{translations[language].paragraph2}</p>
          </div>

          <div className="relative flex justify-center">
            <div className="cultural-images relative hidden lg:block">
              <div className="large-circle w-64 h-64 bg-pink-100 rounded-full overflow-hidden absolute top-0 left-0 z-10">
                <img className="object-cover w-full h-full" src="../../IMG/Studentimage1.jpg" alt={translations[language].altText} />
              </div>
              <div className="medium-circle w-48 h-48 bg-pink-200 rounded-full overflow-hidden absolute bottom-8 left-40 z-10">
                <img className="object-cover w-full h-full" src="../../IMG/Studentimage2.jpg" alt={translations[language].altText} />
              </div>
              <div className="small-circle w-40 h-40 bg-pink-300 rounded-full overflow-hidden absolute bottom-0 right-0 z-10">
                <img className="object-cover w-full h-full" src="../../IMG/Studentimage3.jpg" alt={translations[language].altText} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VISION;
