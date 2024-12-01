'use client'; 

import React from 'react';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', url: '/' },
    { label: 'Our Programs', url: '/programs' },
    { label: 'Our Services', url: '/services' },
    { label: 'Our Teachers', url: '/teachers' },
    { label: 'Our Achievements', url: '/achievements' },
    { label: 'Events', url: '/events' },
    { label: 'News', url: '/news' },
    { label: 'Contact', url: '/contact' },
  ];

  const relianceNetworkLinks = [
    { label: 'Facebook', url: 'https://riacollege.edu.np' },
  ];

  return (
    <footer className="bg-blue-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="footer-top border-b border-gray-700 pb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="aos-init aos-animate flex flex-col items-center text-center" data-aos="fade-in" data-aos-duration="1050">
                <img 
                  src="/api/file/IMG/Logo.jpg" 
                  width="150px" 
                  height="150px" 
                  className="img-fluid object-contain" 
                  alt="Logo" 
                />
              <p className="text-lg font-semibold">Shree Saraswati Secondary School</p>
              <ul className="social-icon flex space-x-3 mt-3">
                <li>
                  <a href="https://www.facebook.com/relianceintlacademy" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-facebook-f"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="aos-init aos-animate" data-aos="fade-in" data-aos-duration="550">
              <h5 className="font-semibold mb-3">Quick Links</h5>
              <ul>
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} className="flex items-center text-gray-300 hover:text-white mb-2">
                      <i className="fa fa-angle-double-right mr-2"></i>{link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="aos-init aos-animate" data-aos="fade-in" data-aos-duration="1050">
              <h5 className="font-semibold mb-3">
                <a href="https://ria.edu.np" target="_blank" rel="noopener noreferrer" className="text-white">
                  Social Network 
                </a>
              </h5>
              <ul>
                {relianceNetworkLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-white mb-2">
                      <i className="fa fa-angle-double-right mr-2"></i>{link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="aos-init aos-animate" data-aos="fade-in" data-aos-duration="1050">
              <h5 className="font-semibold mb-3">Contact Us</h5>
              <ul className="address-icon">
                <li className="flex items-center text-gray-300 mb-3">
                  <i className="fa fa-map-marker mr-3 text-orange-400"></i>Dakaha-4, Sindhuli, Nepal
                </li>
                <li className="flex items-center text-gray-300 mb-3">
                  <i className="fa fa-phone mr-3 text-orange-400"></i>981199494 / 9707432740
                </li>
                <li className="flex items-center text-gray-300 mb-3">
                  <i className="fa fa-envelope mr-3 text-orange-400"></i>sssdakaha@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bottom-footer py-3 flex justify-between items-center">
          <p className="mb-0 text-gray-400">
            <b>Copyright ©</b> <a href="#" target="_blank" rel="noopener noreferrer" className="text-white">Shree Saraswati Secondary School</a>
          </p>
          <ul className="list-inline mb-0">
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;