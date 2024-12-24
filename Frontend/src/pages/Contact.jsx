import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-2xl pt-10 text-center text-gray-500'>
        <p>CONTACT<span className='text-gray-700 font-semibold'>  US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image}/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>Our Office</p>
          <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
          <p className='text-gray-500'>Phone:+91 8015442451</p>
          <p className='text-gray-500'>Email:sowmiyam.it2022@citchennai.net</p>
          <p className='text-gray-600 font-semibold text-lg'>CAREERS AT PRESCRIPTO</p>
          <p className='text-gray-500'>Learn more about our teams and job openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transtion-all duration-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact