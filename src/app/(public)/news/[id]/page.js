'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from "next/image"

const SCHOOL_LOGO = "/school-logo.png"

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [modalImg, setModalImg] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchNewsItem = async () => {
                try {
                    const response = await fetch(`/api/news/${id}`);
                    const data = await response.json();
                    setNewsItem(data);
                } catch (error) {
                    console.error('Error fetching news item:', error);
                }
            };

            fetchNewsItem();
        }
    }, [id]);

    // Modal close handler
    const closeModal = () => setModalImg(null);

    // Modal click outside handler
    const handleModalBgClick = (e) => {
        if (e.target === e.currentTarget) closeModal();
    };

    if (!newsItem) {
        return (
            <div className="container mx-auto px-4 py-4 min-h-screen flex flex-col">
                <div className="flex-grow flex justify-center items-center">
                    <p className="text-gray-500 text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-4 min-h-screen flex flex-col">
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex-grow p-5">
                    <h1 className="text-4xl font-bold mb-4 text-black text-center">{newsItem.title}</h1>
                    <p className="text-gray-600 mb-4 text-center">{newsItem.lastEdited ? new Date(newsItem.lastEdited).toLocaleString() : ""}</p>
                    <div className="prose text-black mb-6" dangerouslySetInnerHTML={{ __html: newsItem.message }} />
                    <div className="flex gap-2 justify-center mb-4 flex-wrap">
                        {(newsItem.images && newsItem.images.length > 0 ? newsItem.images : [SCHOOL_LOGO]).map((img, idx) => (
                            <div key={img} className="cursor-pointer" onClick={() => setModalImg(img)}>
                                <Image
                                    src={img === SCHOOL_LOGO ? img : `/api/file${img.startsWith('/') ? img : '/' + img}`}
                                    alt={`news-img-${idx}`}
                                    width={360}
                                    height={220}
                                    className="rounded object-cover border"
                                    unoptimized={img !== SCHOOL_LOGO}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Modal for focused image */}
            {modalImg && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                    onClick={handleModalBgClick}
                >
                    <div className="relative">
                        <button
                            className="absolute -top-4 -right-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-2xl shadow-lg"
                            onClick={closeModal}
                            aria-label="Close"
                            type="button"
                        >
                            ×
                        </button>
                        <Image
                            src={modalImg === SCHOOL_LOGO ? modalImg : `/api/file${modalImg.startsWith('/') ? modalImg : '/' + modalImg}`}
                            alt="Focused news"
                            width={700}
                            height={500}
                            className="rounded max-h-[80vh] max-w-[90vw] object-contain bg-white"
                            unoptimized={modalImg !== SCHOOL_LOGO}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsDetail;
