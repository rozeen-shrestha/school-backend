'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NewsPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/admin/news/list');
    }, [router]);

    return null;
};

export default NewsPage;