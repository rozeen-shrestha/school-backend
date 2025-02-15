"use client"

import React, { useContext } from 'react';
import { LanguageContext } from '@/components/LanguageContext'; // Importing LanguageContext

const page = () => {
  const { language } = useContext(LanguageContext); // Access the current language from context

  const achievements = [
    {
      title: {
        en: 'Academic Excellence',
        np: 'शैक्षिक उत्कृष्टता',
      },
      image: 'https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg',
      description: {
        en: 'Top results in board exams for consecutive years with a focus on holistic education.',
        np: 'समान्य वर्षहरूमा बोर्ड परीक्षा परिणामहरू, समग्र शिक्षा प्रदान गर्नमा ध्यान केन्द्रित गरिएको।',
      },
    },
    {
      title: {
        en: 'Sports Championship',
        np: 'खेल च्याम्पियनशिप',
      },
      image: 'https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg',
      description: {
        en: 'Winners of inter-school competitions with stellar performances in athletics and team sports.',
        np: 'इंटर-स्कूल प्रतियोगिताहरूमा विजेताहरू, एथलेटिक्स र टोली खेलहरूमा उत्कृष्ट प्रदर्शन।',
      },
    },
    {
      title: {
        en: 'Science Fair Winner',
        np: 'विज्ञान मेला विजेता',
      },
      image: 'https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg',
      description: {
        en: 'Innovative projects that made headlines, including renewable energy models.',
        np: 'नवीनतम परियोजनाहरू जसले हेडलाइन्स बनाएका छन्, जसमा नवीकरणीय ऊर्जा मोडेलहरू समावेश छन्।',
      },
    },
    {
      title: {
        en: 'Debate Champion',
        np: 'विवाद च्याम्पियन',
      },
      image: 'https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg',
      description: {
        en: 'Nationwide debating competition champions for three consecutive years.',
        np: 'तीन लगातार वर्षहरूको लागि राष्ट्रिय बहस प्रतियोगिता च्याम्पियनहरू।',
      },
    },
    {
      title: {
        en: 'Art Showcase',
        np: 'कला प्रदर्शनी',
      },
      image: 'https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg',
      description: {
        en: 'Top awards in creative arts, from painting to digital design.',
        np: 'रचनात्मक कलामा शीर्ष पुरस्कारहरू, चित्रकला देखि डिजिटल डिजाइन सम्म।',
      },
    },
    {
      title: {
        en: 'Community Service',
        np: 'सामुदायिक सेवा',
      },
      image: 'https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg',
      description: {
        en: 'Impactful volunteering initiatives and social awareness campaigns.',
        np: 'प्रभावशाली स्वयंसेवी पहलहरू र सामाजिक सचेतना अभियानहरू।',
      },
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
                  alt={language === 'en' ? achievement.title.en : achievement.title.np}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                  {language === 'en' ? achievement.title.en : achievement.title.np}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {language === 'en' ? achievement.description.en : achievement.description.np}
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
