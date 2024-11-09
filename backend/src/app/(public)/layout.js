"use client"; // Client component
import './public.css';
import { LanguageProvider } from '@/components/LanguageContext';
import TranslateButton from '@/components/TranslateButton';
import Navbar from '@/components/frontend/navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body > {/* Add padding to the top */}
        <LanguageProvider>
          <Navbar />
          {children}
          <TranslateButton /> {/* Ensure this line is present */}
        </LanguageProvider>
      </body>
    </html>
  );
}
