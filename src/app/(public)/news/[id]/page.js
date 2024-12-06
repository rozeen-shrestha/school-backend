'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);

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
                    <p className="text-gray-600 mb-4 text-center">{newsItem.lastEdited}</p>
                    <div className="prose text-black" dangerouslySetInnerHTML={{ __html: newsItem.message }} />
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
