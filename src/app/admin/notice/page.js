'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/admin/notice/manage');
    }, [router]);

    return null;
};

export default AdminPage;
