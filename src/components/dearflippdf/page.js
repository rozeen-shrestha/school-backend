'use client';
import React, { useEffect } from 'react';
import './dflip/css/dflip.min.css'; // Adjust the path if necessary
import './dflip/css/themify-icons.min.css'; // Adjust the path if necessary

const FlipBook = ({ pdfUrl, backgroundColor = 'transparent' }) => {
    useEffect(() => {
        const loadJQueryAndDflip = async () => {
            try {
                // Load jQuery first
                await new Promise((resolve, reject) => {
                    const script1 = document.createElement('script');
                    script1.src = '/api/file/dflip/js/libs/jquery.min.js'; // Adjust the path if necessary
                    script1.async = true;
                    script1.onload = resolve;
                    script1.onerror = reject;
                    document.body.appendChild(script1);
                });

                // Load dflip after jQuery is loaded
                await new Promise((resolve, reject) => {
                    const script2 = document.createElement('script');
                    script2.src = '/api/file/dflip/js/dflip.min.js'; // Adjust the path if necessary
                    script2.async = true;
                    script2.onload = resolve;
                    script2.onerror = reject;
                    document.body.appendChild(script2);
                });
            } catch (error) {
                console.error('Error loading scripts:', error);
            }
        };

        loadJQueryAndDflip();

        // Cleanup scripts when component unmounts
        return () => {
            document.querySelectorAll('script[src="/api/file/dflip/js/libs/jquery.min.js"], script[src="/api/file/dflip/js/dflip.min.js"]').forEach(script => {
                document.body.removeChild(script);
            });
        };
    }, []);

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', position: 'relative', width: '100%', paddingTop: '141.42%' }}>
            {/* Aspect ratio box for A4 (1:1.414) */}
            <div
                className="_df_book"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor,
                }}
                webgl="true"
                source={pdfUrl}
                id="df_manual_book"
            />
        </div>
    );
};

export default FlipBook;
