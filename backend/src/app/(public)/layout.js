"use client"; // Client component
import localFont from 'next/font/local';
import '../globals.css';
import { LanguageProvider } from '@/components/LanguageContext';
import TranslateButton from '@/components/TranslateButton';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
          <TranslateButton /> {/* Ensure this line is present */}
        </LanguageProvider>
      </body>
    </html>
  );
}
