'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FacultyPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/admin/faculty/list');
    }, [router]);

    return null;
};

export default FacultyPage;
