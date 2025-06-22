import HERO from '@/components/frontend/hero'
import MESSAGE from '@/components/frontend/message'
import Navbar from '@/components/frontend/navbar'
import OBJMISSION from '@/components/frontend/objmission'
import OURSERVICES from '@/components/frontend/ourservices'
import React from 'react'

const page = () => {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Navbar/>
      <HERO/>
      <OBJMISSION/>
      <MESSAGE/>
      <OURSERVICES/>

    </div>
  )
}

export default page
