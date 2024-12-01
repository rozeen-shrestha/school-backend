"use client"; // Client component
import './public.css';
import { LanguageProvider } from '@/components/LanguageContext';
import TranslateButton from '@/components/TranslateButton';
import Footer from '@/components/frontend/footer';
import Navbar from '@/components/frontend/navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body > {/* Add padding to the top */}
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer/>
        </LanguageProvider>
      </body>
    </html>
  );
}
