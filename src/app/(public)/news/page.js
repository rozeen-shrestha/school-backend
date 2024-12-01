'use client'
import NewsGrid from '@/components/frontend/NewsGrid'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Page = () => {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('/api/news');
                // Transform and sort the data
                const transformedData = response.data
                    .map(item => ({
                        id: item._id,
                        title: item.title,
                        date: new Date(item.lastEdited).toISOString().split('T')[0]
                    }))
                    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort newest first

                setNewsData(transformedData);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <>
        <div className="py-12 px-4 sm:px-6 lg:px-8"></div>
        <div className="relative mb-12 text-center">
            <h1 className="relative text-4xl font-bold text-gray-900 mb-2">News</h1>
            <p className="relative text-gray-600">View the latest news</p>
          </div>
             <div className="py-12 px-4 sm:px-6 lg:px-8">
            <NewsGrid newsData={newsData} />
            </div>
        </>
    )
}

export default Page
