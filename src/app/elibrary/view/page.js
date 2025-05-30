'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LibraryPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/elibrary/dashboard');
    }, [router]);

    return null;
};

export default LibraryPage;
