import React, { useContext, useState } from 'react';
import { LanguageContext } from './LanguageContext'; // Importing the context

const TranslateButton = () => {
  const { language, toggleLanguage } = useContext(LanguageContext); // Getting the language and toggle function
  const [loading, setLoading] = useState(false); // State for loading

  const handleClick = () => {
    setLoading(true); // Set loading to true
    setTimeout(() => {
      toggleLanguage(); // Toggle language after 1 second
      setLoading(false); // Reset loading state
    }, 1000);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
            <div className="flex items-center">
              <span className="text-3xl mr-4">Loading</span>
              <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleClick}
        className="bg-gray-600 rounded-full w-36 h-12 text-white font-semibold flex justify-center items-center fixed bottom-5 right-5 z-50" // Adjusted width and height
      >
        <span className="text-xl">{language === 'en' ? 'NP' : 'EN'}</span> {/* Centered the language code */}
        <span className="text-xl ml-2">{language === 'en' ? 'Nepali' : 'English'}</span> {/* Adjusted for clearer alignment */}
      </button>
    </>
  );
};

export default TranslateButton;
