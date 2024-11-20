'use client';
import { SessionProvider } from 'next-auth/react';
import ContentWraper from '@/components/elibraryui/ContentWraper';
import LIBRARYUI from '@/components/elibraryui/page';

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
        <LIBRARYUI>
          <ContentWraper>
            {children}
          </ContentWraper>
        </LIBRARYUI>
    </SessionProvider>
  );
}
