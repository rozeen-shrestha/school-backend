"use client";

import React, { useEffect, useContext, useRef } from "react";
import { LanguageContext } from "@/components/LanguageContext";

const PrincipalMessage = () => {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      heading: "Learning Today, Leading Tomorrow.",
      paragraphs: [
        "Welcome to Shree Saraswati Secondary School! Our school is a place where learning is fun, and every child is encouraged to do their best. We believe education is not just about books and exams but also about building good character and discovering new talents.",
        "Our teachers are dedicated to helping each student grow in their own unique way. They work hard to make lessons interesting and ensure every child feels supported and valued.",
        "Along with studies, we focus on activities like sports, arts, and community service to help students become well-rounded individuals. These activities teach teamwork, responsibility, and creativity, which are just as important as academics.",
        "We know that parents and families play a big role in a child's success. That's why we value working together with you to create the best opportunities for our students. Your support and encouragement mean so much to us.",
        "As we move forward, let's continue to inspire our students to dream big and work hard. Together, we can help them grow into confident, kind, and responsible people who can make the world a better place."
      ],
      principalName: "John Doe",
      principalTitle: "Chairman / Principal",
      altText: "Principal Image",
    },
    np: {
      heading: "आज सिक्दै, भोलि नेतृत्व गर्दै",
      paragraphs: [
        "श्री सरस्वती माध्यमिक विद्यालयमा स्वागत छ! हाम्रो विद्यालय त्यस्तो स्थान हो, जहाँ सिकाइ रमाइलो छ, र प्रत्येक विद्यार्थीलाई आफ्नो उत्कृष्टता प्रदर्शन गर्न प्रेरित गरिन्छ। हामी विश्वास गर्छौं कि शिक्षा केवल किताब र परीक्षा सम्म सीमित छैन; यो राम्रो चरित्र निर्माण र नयाँ प्रतिभा पत्ता लगाउने यात्रा पनि हो।",
        "हाम्रा शिक्षकहरू प्रत्येक विद्यार्थीलाई आफ्नो अनौठो तरिकाले बढ्न मद्दत गर्न समर्पित छन्। उनीहरूले पाठहरू चाखलाग्दो बनाउने र प्रत्येक विद्यार्थीलाई सहयोग र सम्मानित महसुस गराउने प्रयास गर्छन्।",
        "पढाइसँगै, खेलकुद, कला, र सामुदायिक सेवाजस्ता गतिविधिहरूमा पनि हामी ध्यान दिन्छौं। यी गतिविधिहरूले टोलीमा काम गर्ने, जिम्मेवारी बहन गर्ने, र रचनात्मक बन्ने गुण सिकाउँछन्, जुन अध्ययन जत्तिकै महत्वपूर्ण छन्।",
        "हामीलाई थाहा छ, विद्यार्थीहरूको सफलतामा अभिभावक र परिवारको ठूलो भूमिका हुन्छ। त्यसैले, हामी तपाईंसँग सहकार्य गर्न र हाम्रा विद्यार्थीहरूका लागि सबैभन्दा राम्रो अवसरहरू सिर्जना गर्न चाहन्छौं। तपाईको सहयोग र हौसला हामीलाई धेरै महत्त्वपूर्ण छ।",
        "आउनुहोस्, हामी हाम्रा विद्यार्थीहरूलाई ठूलो सपना देख्न, मेहनत गर्न, र राम्रो मान्छे बन्न प्रेरित गर्न सँगै काम गरौँ। मिलेर, हामी उनीहरूलाई संसारलाई अझ राम्रो ठाउँ बनाउन तयार गर्न सक्छौं।"
      ],
      principalName: "जोन डो",
      principalTitle: "अध्यक्ष / प्रिन्सिपल",
      altText: "प्रिन्सिपलको छवि",
    },
  };

  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const sectionRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("hidden-slide-out");
        } else {
          entry.target.classList.remove("visible");
          entry.target.classList.add("hidden-slide-out");
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const refs = [headerRef, imageRef, sectionRef, footerRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <style>
        {`
          .hidden-slide {
            opacity: 0;
            transform: translateY(-50%);
            transition: all 0.8s ease-in-out;
          }

          .visible {
            opacity: 1;
            transform: translateY(0);
          }

          .hidden-slide-out {
            opacity: 0;
            transform: translateY(-50%);
          }
        `}
      </style>
      <div className="max-w-5xl mx-auto p-6">
        <header className="text-center my-8 hidden-slide" ref={headerRef}>
          <h1 className="text-3xl sm:text-4xl text-blue-900 font-bold">
            {translations[language].heading}
          </h1>
        </header>

        <div className="flex justify-center my-8 hidden-slide" ref={imageRef}>
          <div className="border-2 border-gray-300 p-4 rounded-lg">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVOYEI-W4LmfCrb8AGSP3IIR1cPcQJiVu3w&s"
              alt={translations[language].altText}
              className="w-40 h-40 object-cover rounded-lg mx-auto"
            />
          </div>
        </div>

        <section
          className="text-center space-y-4 text-gray-700 leading-relaxed px-4 sm:px-6 hidden-slide"
          ref={sectionRef}
        >
          {translations[language].paragraphs.map((paragraph, index) => (
            <p key={index} className="break-words">
              {paragraph}
            </p>
          ))}
        </section>

        <footer className="mt-12 text-center hidden-slide" ref={footerRef}>
          <h2 className="text-lg font-semibold text-blue-900">
            {translations[language].principalName}
          </h2>
          <p className="text-gray-500">{translations[language].principalTitle}</p>
        </footer>
      </div>
    </div>
  );
};

export default PrincipalMessage;