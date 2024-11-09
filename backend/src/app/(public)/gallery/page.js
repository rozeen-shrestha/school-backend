'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Separator } from "@/components/ui/separator";

export default function Page() {
  // Add new state for modal
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 400, // Faster animation
      once: false,
      mirror: false,
      offset: 0, // Show elements as soon as they enter viewport
      disable: 'mobile' // Disable on mobile for better performance
    });

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/media/photo/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!isChanging) {
      AOS.refresh();
    }
  }, [selectedCategory, isChanging]);

  // Add modal handlers
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const getAllImages = () => {
    return categories.flatMap(category =>
      category.uploads.map(upload => ({
        url: `/api/file/${upload.path}`,
        category: category.name,
        id: `${category.name}-${upload.path}`
      }))
    );
  };

  const getFilteredImages = () => {
    if (selectedCategory === 'all') return getAllImages();
    const category = categories.find(cat => cat.name === selectedCategory);
    return category ? category.uploads.map(upload => ({
      url: `/api/file/${upload.path}`,
      category: category.name,
      id: `${category.name}-${upload.path}`
    })) : [];
  };

  const handleCategoryChange = (category) => {
    if (category === selectedCategory) return;

    setIsChanging(true);
    setSelectedCategory(category);

    // Refresh AOS animations
    setTimeout(() => {
      AOS.refresh();
      setIsChanging(false);
    }, 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const groupedImages = selectedCategory === 'all'
    ? categories.reduce((acc, category) => {
        acc[category.name] = category.uploads.map(upload => ({
          url: `/api/file/${upload.path}`,
          category: category.name,
          id: `${category.name}-${upload.path}`
        }));
        return acc;
      }, {})
    : { [selectedCategory]: getFilteredImages() };

  return (
    <div className="container mx-auto px-4">
      <div className="py-12">
        <h1 className="text-6xl font-bold text-center mb-12 text-gray-800 tracking-wide"
            data-aos="fade-down"
            data-aos-duration="1000">
          Our Gallery
        </h1>

        <div className="flex flex-col gap-6" data-aos="fade-up" data-aos-duration="1000">
          <ul className="flex flex-wrap justify-center gap-2 mb-4" role="tablist">
            {categories.map((category) => (
              <li key={category.name}>
                <button
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-6 py-2.5 text-sm font-medium transition-all duration-300
                    border-2 rounded-md hover:shadow-lg
                    ${selectedCategory === category.name
                      ? 'bg-blue-600 text-white border-blue-600 transform scale-105'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'}`}
                  role="tab"
                  aria-selected={selectedCategory === category.name}
                >
                  {category.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-8 py-2.5 text-sm font-medium transition-all duration-300
                  border-2 rounded-md hover:shadow-lg
                  ${selectedCategory === 'all'
                    ? 'bg-blue-600 text-white border-blue-600 transform scale-105'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'}`}
                role="tab"
                aria-selected={selectedCategory === 'all'}
              >
                All
              </button>
            </li>
          </ul>

          {Object.entries(groupedImages).map(([categoryName, images], index) => (
            images.length > 0 && (
              <div key={categoryName} className="mb-12">
                <div className="flex items-center gap-4 mb-8" data-aos="fade-up">
                  <Separator className="flex-1" />
                  <h2 className="text-2xl font-semibold text-gray-700">{categoryName}</h2>
                  <Separator className="flex-1" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((image, imageIndex) => (
                    <div
                      key={image.id}
                      onClick={() => openModal(image)}
                      className={`group relative overflow-hidden rounded-lg shadow-lg cursor-pointer
                        transform transition-all duration-200 ease-out
                        ${isChanging ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
                        hover:scale-105`}
                      style={{ transitionDelay: `${imageIndex * 20}ms` }}
                      data-aos="fade-up"
                      data-aos-duration="400"
                      data-aos-offset="0"
                    >
                      <img
                        src={image.url}
                        alt={`${image.category} image`}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-7xl w-full h-full flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            >
              ×
            </button>
            <img
              src={selectedImage?.url}
              alt={`${selectedImage?.category} full view`}
              className="max-h-[90vh] max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
