import React from 'react';
import dynamic from 'next/dynamic';

const FlipBook = dynamic(() => import('@/components/dearflippdf/page'), { ssr: false });

const Page = () => {
  return (
    <div>
      <FlipBook pdfUrl="https://pdfobject.com/pdf/sample.pdf" backgroundColor="black" />
    </div>
  );
};

export default Page;
