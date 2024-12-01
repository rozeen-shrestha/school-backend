"use client";

import React, { useContext } from 'react';
import { LanguageContext } from '@/components/LanguageContext'; // Importing the context

const CCONTACT = () => {
    const { language } = useContext(LanguageContext); // Getting the language from context

    const translations = {
        en: {
            title: "Schedule a Date to Contact",
            guardianName: "Guardian's Name",
            guardianNumber: "Guardian's Number",
            childName: "Child's Name",
            childAge: "Child's Age",
            message: "Message",
            submit: "Submit",
        },
        np: {
            title: "सम्पर्क गर्नको लागि मिति तय गर्नुहोस्",
            guardianName: "अभिभावकको नाम",
            guardianNumber: "अभिभावकको नम्बर",
            childName: "बच्चाको नाम",
            childAge: "बच्चाको उमेर",
            message: "सन्देश",
            submit: "पेश गर्नुहोस्",
        },
    };

    return (
        <div>
            <div className="container mx-auto p-4">
            <div className="py-12 px-4 sm:px-6 lg:px-8"></div>
                <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
                    <div className="p-10 bg-pink-100 md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">{translations[language].title}</h2>
                        <form action="#">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="guardian-name" className="block text-gray-600 mb-2">
                                        {translations[language].guardianName}
                                    </label>
                                    <input
                                        type="text"
                                        id="guardian-name"
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        placeholder={translations[language].guardianName}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="guardian-number" className="block text-gray-600 mb-2">
                                        {translations[language].guardianNumber}
                                    </label>
                                    <input
                                        type="number"
                                        id="guardian-number"
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        placeholder={translations[language].guardianNumber}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="child-name" className="block text-gray-600 mb-2">
                                        {translations[language].childName}
                                    </label>
                                    <input
                                        type="text"
                                        id="child-name"
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        placeholder={translations[language].childName}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="child-age" className="block text-gray-600 mb-2">
                                        {translations[language].childAge}
                                    </label>
                                    <input
                                        type="number"
                                        id="child-age"
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        placeholder={translations[language].childAge}
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="message" className="block text-gray-600 mb-2">
                                    {translations[language].message}
                                </label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder={translations[language].message}
                                />
                            </div>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-600"
                                >
                                    {translations[language].submit}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="md:w-1/2">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.8874816395687!2d86.154012176399!3d27.021096736779036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec050061308dad%3A0xac92310a602ddc50!2sShree%20Saraswati%20Secondary%20School%20Dakaha-4%20Sindhuli!5e0!3m2!1sen!2snp!4v1695312228902!5m2!1sen!2snp"
                            width="100%"
                            height="500"
                            className="h-full w-full"
                            style={{ border: 0 }}
                            allowFullScreen
                            aria-hidden={false}
                            tabIndex={0}
                        />
                    </div>
                </div>
            </div>
            <div className="py-12 px-4 sm:px-6 lg:px-8"></div>
        </div>
    );
};

export default CCONTACT;
