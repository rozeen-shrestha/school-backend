    'use client';
    import React, { useEffect } from 'react';
    import './dflip/css/dflip.min.css'; // Adjust the path if necessary
    import './dflip/css/themify-icons.min.css'; // Adjust the path if necessary

    const FlipBook = ({ pdfUrl, height = '500', backgroundColor = 'teal' }) => {
    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = './dflip/js/libs/jquery.min.js'; // Adjust path if necessary
        script1.async = true;

        const script2 = document.createElement('script');
        script2.src = './dflip/js/dflip.min.js'; // Adjust path if necessary
        script2.async = true;

        script1.onload = () => {
        console.log('jQuery script loaded');
        };

        script2.onload = () => {
        };

        script1.onerror = () => {
        console.error('Failed to load jQuery script');
        };

        script2.onerror = () => {
        console.error('Failed to load dflip script');
        };

        document.body.appendChild(script1);
        document.body.appendChild(script2);

        // Cleanup function to remove scripts if necessary
        return () => {
        document.body.removeChild(script1);
        document.body.removeChild(script2);
        };
    }, []);

    return (
        <div className="container">
            {/* Normal Flipbook */}
            <div
                className="_df_book"
                height={height}
                webgl="true"
                backgroundcolor={backgroundColor}
                source={pdfUrl}
                id="df_manual_book"
            />
            </div>

    );
    };

    export default FlipBook;
