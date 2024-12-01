"use client"

import React, { useState } from 'react';

const page = () => {
    const [activeTab, setActiveTab] = useState('upcoming');

    const upcomingEvents = [
        { id: 1, name: 'Upcoming Event 1', date: '2024-12-01', details: 'Details about the upcoming event 1.' },
        { id: 2, name: 'Upcoming Event 2', date: '2024-12-10', details: 'Details about the upcoming event 2.' },
    ];

    const expiredEvents = [
        { id: 1, name: 'Expired Event 1', date: '2024-10-01', details: 'Details about the expired event 1.' },
        { id: 2, name: 'Expired Event 2', date: '2024-09-15', details: 'Details about the expired event 2.' },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto mt-60 flex-grow">
                <div className="max-w-3xl mx-auto">
                    {/* Tabs for Upcoming and Expired */}
                    <div className="flex justify-center border-b border-gray-300 mb-6">
                        <button
                            className={`px-6 py-3 text-lg font-semibold ${activeTab === 'upcoming'
                                    ? 'text-blue-600 border-b-4 border-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                                }`}
                            onClick={() => setActiveTab('upcoming')}
                        >
                            Upcoming
                        </button>
                        <button
                            className={`px-6 py-3 text-lg font-semibold ${activeTab === 'expired'
                                    ? 'text-blue-600 border-b-4 border-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                                }`}
                            onClick={() => setActiveTab('expired')}
                        >
                            Expired
                        </button>
                    </div>

                    {/* Events List */}
                    <div>
                        {activeTab === 'upcoming' ? (
                            <div>
                                {upcomingEvents.length > 0 ? (
                                    upcomingEvents.map((event) => (
                                        <div
                                            key={event.id}
                                            className="p-6 bg-white shadow-lg rounded-lg mb-4 border border-gray-200 transition transform hover:scale-105 hover:shadow-xl"
                                        >
                                            <h4 className="text-xl font-bold mb-2">{event.name}</h4>
                                            <p className="text-gray-500 mb-1">Date: {event.date}</p>
                                            <p className="text-gray-700">{event.details}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">No upcoming events.</p>
                                )}
                            </div>
                        ) : (
                            <div>
                                {expiredEvents.length > 0 ? (
                                    expiredEvents.map((event) => (
                                        <div
                                            key={event.id}
                                            className="p-6 bg-gray-100 shadow-lg rounded-lg mb-4 border border-gray-200 transition transform hover:scale-105 hover:shadow-xl"
                                        >
                                            <h4 className="text-xl font-bold mb-2">{event.name}</h4>
                                            <p className="text-gray-500 mb-1">Date: {event.date}</p>
                                            <p className="text-gray-700">{event.details}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">No expired events.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default page;