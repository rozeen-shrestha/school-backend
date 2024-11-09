import CCONTACT from '@/components/frontend/customcontact';
import Footer from '@/components/frontend/footer'
import NewsGrid from '@/components/frontend/NewsGrid'
import React from 'react'

const page = () => {
    const sampleNews = [
        {
          id: 1,
          title: "Breaking News: Major Scientific Discovery",
          date: "2024-11-09"
        },
        {
          id: 2,
          title: "Tech Giant Announces Revolutionary Product",
          date: "2024-11-08"
        },
        {
          id: 3,
          title: "Global Climate Summit Reaches Historic Agreement",
          date: "2024-11-07"
        },{
            id: 4,
            title: "Breaking News: Major Scientific Discovery",
            date: "2024-11-09"
          },
          {
            id: 5,
            title: "Tech Giant Announces Revolutionary Product",
            date: "2024-11-08"
          },
          {
            id: 6,
            title: "Global Climate Summit Reaches Historic Agreement",
            date: "2024-11-07"
          },
          {
            id: 7,
            title: "Breaking News: Major Scientific Discovery",
            date: "2024-11-09"
          },
          {
            id: 8,
            title: "Tech Giant Announces Revolutionary Product",
            date: "2024-11-08"
          },
          {
            id: 9,
            title: "Global Climate Summit Reaches Historic Agreement",
            date: "2024-11-07"
          },

      ];

  return (
    <div>
            <a className='text-white'>NEWS</a>
        <NewsGrid newsData={sampleNews} />
       <CCONTACT/>
    </div>
  )
}

export default page
