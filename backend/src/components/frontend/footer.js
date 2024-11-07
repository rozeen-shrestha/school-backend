'use client'

import React from 'react';
import { useState } from 'react';
import { Map, Phone, Mail, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const importantLinks = [
    { title: "GoN Official Portal", url: "http://nepal.gov.np/" },
    { title: "Office of the Prime Minister and Council of Ministers", url: "https://www.opmcm.gov.np/" },
    { title: "Ministry of Education, Science & Technology", url: "https://moest.gov.np" },
    { title: "Electronic Procurement System (e-GP System)", url: "https://bolptra.gov.np" },
    { title: "Integrated Office Management System", url: "http://gioms.gov.np" },
    { title: "IEMIS System", url: "https://emis.cehrd.gov.np" },
  ];

  return (
    <footer className="relative mt-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16">
              <img
                src="https://giwmscdnone.gov.np/static/assets/image/Emblem_of_Nepal.png"
                alt="Nepal Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold">Center for Education and Human Resource Development</h4>
              <p className="text-gray-600">Sanothimi, Bhaktapur</p>
            </div>
          </div>

          {/* Office Hours Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Office hours</h4>

            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-700">Winter (Kartik 16 to Magh 15)</h5>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday - Thursday</span>
                    <span className="text-gray-600">10:00 A.M. - 4:00 P.M.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Friday</span>
                    <span className="text-gray-600">10:00 A.M. - 3:00 P.M.</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h5 className="font-medium text-gray-700">Summer (Magh 16 to Kartik 15)</h5>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday - Thursday</span>
                    <span className="text-gray-600">10:00 A.M. - 5:00 P.M.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Friday</span>
                    <span className="text-gray-600">10:00 A.M. - 3:00 P.M.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Important Links</h4>
            <ul className="space-y-2">
              {importantLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Map className="w-4 h-4" />
                <span>Sanothimi, Bhaktapur</span>
              </div>

              <a href="mailto:info@cehrd.gov.np" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Mail className="w-4 h-4" />
                <span>info@cehrd.gov.np</span>
              </a>

              <a href="tel:977-1-6631075" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Phone className="w-4 h-4" />
                <span>977-1-6631075</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Image */}
      <div className="w-full h-16 mt-8">
        <img
          src="https://giwmscdnone.gov.np/media/albums/topbg_CUCDohGKGe_VjmdWXC4XS_L2dmvC8XO5.png"
          alt="Footer decoration"
          className="w-full h-full object-cover"
        />
      </div>
    </footer>
  );
};

export default Footer;
