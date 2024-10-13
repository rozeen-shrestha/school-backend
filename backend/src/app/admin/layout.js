// backend/src/app/admin/layout.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import ADMINUI from '@/components/adminui/page';
import ContentWraper from '@/components/adminui/ContentWraper';

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (!session || session.user.role !== 'admin') {
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div>
        <ADMINUI>
            <ContentWraper>
      {children}
      </ContentWraper>
      </ADMINUI>
    </div>
  );
}
