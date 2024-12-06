'use client';

import React, { useContext } from 'react';
import { LanguageContext } from "@/components/LanguageContext";

const Footer = () => {
  const { language, toggleLanguage } = useContext(LanguageContext); // Accessing the language and toggle function

  const quickLinks = [
    { label: { en: 'Home', np: 'मुख्य पृष्ठ' }, url: '/' },
    { label: { en: 'Our Programs', np: 'हाम्रो संकाय' }, url: '/programs' },
    { label: { en: 'Our Services', np: 'हाम्रो सेवाहरू' }, url: '/services' },
    { label: { en: 'Our Teachers', np: 'हाम्रो शिक्षक' }, url: '/teachers' },
    { label: { en: 'Our Achievements', np: 'हाम्रो उपलब्धिहरू' }, url: '/achievements' },
    { label: { en: 'News', np: 'समाचार' }, url: '/news' },
    { label: { en: 'Contact', np: 'सम्पर्क' }, url: '/contact' },
  ];

  const relianceNetworkLinks = [
    { label: { en: 'Facebook', np: 'फेसबुक' }, url: 'https://riacollege.edu.np' },
  ];

  return (
    <footer className="bg-blue-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="footer-top border-b border-gray-700 pb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className="aos-init aos-animate flex flex-col items-center text-center"
              data-aos="fade-in"
              data-aos-duration="1050"
            >
              <img
                src="/api/file/IMG/Logo.jpg"
                width="150px"
                height="150px"
                className="img-fluid object-contain"
                alt="Logo"
              />
              <p className="text-lg font-semibold">
                {language === 'en'
                  ? 'Shree Saraswati Secondary School'
                  : 'श्री सरस्वती माध्यमिक विद्यालय'}
              </p>
              <ul className="social-icon flex space-x-3 mt-3">
                <li>
                  <a
                    href="https://www.facebook.com/relianceintlacademy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-facebook-f"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="aos-init aos-animate" data-aos="fade-in" data-aos-duration="550">
              <h5 className="font-semibold mb-3">
                {language === 'en' ? 'Quick Links' : 'चाँडो पहुँच'}
              </h5>
              <ul>
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="flex items-center text-gray-300 hover:text-white mb-2"
                    >
                      <i className="fa fa-angle-double-right mr-2"></i>
                      {language === 'en' ? link.label.en : link.label.np}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="aos-init aos-animate" data-aos="fade-in" data-aos-duration="1050">
              <h5 className="font-semibold mb-3">
                <a
                  href="https://ria.edu.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  {language === 'en' ? 'Social Network' : 'सामाजिक सञ्जाल'}
                </a>
              </h5>
              <ul>
                {relianceNetworkLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-white mb-2"
                    >
                      <i className="fa fa-angle-double-right mr-2"></i>
                      {language === 'en' ? link.label.en : link.label.np}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="aos-init aos-animate" data-aos="fade-in" data-aos-duration="1050">
              <h5 className="font-semibold mb-3">
                {language === 'en' ? 'Contact Us' : 'सम्पर्क गर्नुहोस्'}
              </h5>
              <ul className="address-icon">
                <li className="flex items-center text-gray-300 mb-3">
                  <i className="fa fa-map-marker mr-3 text-orange-400"></i>
                  {language === 'en'
                    ? 'Dakaha-4, Sindhuli, Nepal'
                    : 'डाकाहा-४, सिन्धुली, नेपाल'}
                </li>
                <li className="flex items-center text-gray-300 mb-3">
                  <i className="fa fa-phone mr-3 text-orange-400"></i>
                  981199494 / 9707432740
                </li>
                <li className="flex items-center text-gray-300 mb-3">
                  <i className="fa fa-envelope mr-3 text-orange-400"></i>
                  sssdakaha@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bottom-footer py-3 flex justify-between items-center">
          <p className="mb-0 text-gray-400">
            <b>Copyright ©</b>{' '}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              {language === 'en'
                ? 'Shree Saraswati Secondary School'
                : 'श्री सरस्वती माध्यमिक विद्यालय'}
            </a>
          </p>
          <button
            onClick={toggleLanguage}
            className="text-white"
          >
            {language === 'en' ? 'Switch to Nepali' : 'अंग्रेजीमा स्विच गर्नुहोस्'}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
