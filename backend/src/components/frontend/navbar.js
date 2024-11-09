'use client';

import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { LanguageContext } from '@/components/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useContext(LanguageContext);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Combined content structure
  const content = {
    schoolName: {
      en: "Shree Saraswati Secondary School",
      np: "श्री सरस्वती माध्यमिक विद्यालय"
    },
    address: {
      en: "Dakaha-4, Sindhuli, Nepal",
      np: "डाकाहा-४, सिन्धुली, नेपाल"
    },
    notice: {
      en: "Important Notice",
      np: "महत्वपूर्ण सूचना"
    },
    login: {
      en: "Login",
      np: "लगइन"
    },
    signup: {
      en: "Signup",
      np: "साइन अप"
    },
    nav: {
      home: {
        en: "Home",
        np: "मुख्य पृष्ठ",
        link: "/",
        id: "home"
      },
      about: {
        en: "About Us",
        np: "हाम्रो बारेमा",
        link: "/about",
        id: "about"
      },
      faculty: {
        en: "Our Faculty",
        np: "हाम्रो संकाय",
        link: "/faculty",
        id: "faculty"
      },
      teacher: {
        en: "Our Teachers",
        np: "हाम्रो शिक्षक",
        link: "/teacher",
        id: "teacher"
      },
      achievements: {
        en: "Our Achievements",
        np: "हाम्रो उपलब्धिहरू",
        link: "/achievements",
        id: "achievements"
      },
      events: {
        en: "Events",
        np: "घटना",
        link: "/events",
        id: "events"
      },
      news: {
        en: "News",
        np: "समाचार",
        link: "/news",
        id: "news"
      },
      contact: {
        en: "Contact",
        np: "सम्पर्क",
        link: "/contact",
        id: "contact"
      }
    }
  };

  // Helper function to get text based on current language
  const getText = (contentObj) => contentObj[language];

  // Navigation items array for easy mapping
  const navItems = Object.values(content.nav);

  return (
    <div className="relative">
      <div className="w-full z-50 bg-blue-800 text-white fixed top-0 transition-all duration-300 shadow-md">
        {/* Top bar - Only shown when not scrolled */}
        {!isScrolled && (
          <div className="container mx-auto transition-all duration-300">
            <div className="px-4 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img src="./IMG/Logo.jpg" alt="Logo" className="w-12 h-12 rounded-full shadow-lg" />
                <div className="hidden md:block">
                  <h1 className="font-bold text-lg leading-tight">{getText(content.schoolName)}</h1>
                  <p className="text-sm text-gray-200">{getText(content.address)}</p>
                </div>
              </div>

              <div className="hidden md:block text-center">
                <p className="font-bold text-lg">{getText(content.notice)}</p>
              </div>

              <div className="hidden md:flex items-center space-x-3">
                <button className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors duration-200 font-semibold text-sm">
                  {getText(content.login)}
                </button>
                <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-md transition-colors duration-200 font-semibold text-sm">
                  {getText(content.signup)}
                </button>
              </div>

              <button
                onClick={toggleMenu}
                className="md:hidden p-2 hover:bg-blue-700 rounded-md transition-colors duration-200"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        )}

        {/* Navigation bar */}
        <div className={`container mx-auto transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-2 bg-blue-800'
        }`}>
          <div className="px-4 flex justify-between items-center">
            <div className="hidden md:flex items-center space-x-8 w-full">
              {isScrolled && (
                <img src="./IMG/Logo.jpg" alt="Logo" className="w-10 h-10 rounded-full shadow-lg" />
              )}

              <nav className="flex space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.link}
                    className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
                  >
                    {getText(item)}
                  </Link>
                ))}
              </nav>
            </div>

            {isScrolled && (
              <div className="md:hidden flex items-center justify-between w-full">
                <img src="./IMG/Logo.jpg" alt="Logo" className="w-10 h-10 rounded-full shadow-lg" />
                <button
                  onClick={toggleMenu}
                  className="p-2 hover:bg-blue-700 rounded-md transition-colors duration-200"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            )}

            {isScrolled && (
              <div className="hidden md:flex items-center space-x-3">
                <button className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors duration-200 font-semibold text-sm">
                  {getText(content.login)}
                </button>
                <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-md transition-colors duration-200 font-semibold text-sm">
                  {getText(content.signup)}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}>
          <nav className="px-4 py-2 bg-blue-900 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="block py-3 px-4 hover:bg-blue-800 rounded-md transition-colors duration-200"
              >
                {getText(item)}
              </Link>
            ))}

            <div className="py-4 space-y-2 px-4">
              <button className="w-full bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors duration-200 font-semibold text-sm">
                {getText(content.login)}
              </button>
              <button className="w-full bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-md transition-colors duration-200 font-semibold text-sm">
                {getText(content.signup)}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Spacer div */}
      <div className={`transition-all duration-300 ${
        isScrolled ? 'h-16' : 'h-32'
      }`} />
    </div>
  );
};

export default Navbar;
