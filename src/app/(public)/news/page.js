'use client'
import NewsGrid from '@/components/frontend/NewsGrid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
    const [newsData, setNewsData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news');
                const data = await response.json();
                const transformedData = data.map(item => ({
                    ...item,
                    id: item._id,
                    images: item.images || [],
                    lastEdited: item.lastEdited ? new Date(item.lastEdited).toLocaleString() : ""
                }));
                setNewsData(transformedData);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    const handleNewsClick = (id) => {
        router.push(`/news/${id}`);
    };

    return (
        <>
            <div className="py-12 px-4 sm:px-6 lg:px-8"></div>
            <div className="relative mb-12 text-center">
                <h1 className="relative text-4xl font-bold text-gray-900 mb-2">News</h1>
                <p className="relative text-gray-600">View the latest news</p>
            </div>
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <NewsGrid newsData={newsData} onNewsClick={handleNewsClick} />
            </div>
        </>
    );
};

export default Page;
