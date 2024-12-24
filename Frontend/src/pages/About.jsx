import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700'>US</span> </p>
      </div>
      <div className='my-10 flex flex-col md:flex-row  gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image}></img>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt expedita aperiam, ut, blanditiis, rem fugit assumenda sunt quis unde illum hic. Pariatur sapiente repellendus doloremque culpa dolores omnis sit reiciendis.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio maxime fugiat vel officiis, laudantium omnis corporis voluptatum fugit laboriosam ab in nemo at sit vero quisquam velit maiores id aspernatur?</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo ad fuga possimus perferendis distinctio ducimus voluptates consequuntur sed modi ipsa laudantium a blanditiis nisi sit id repudiandae consequatur, quia assumenda!</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'> CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, voluptatum?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
           <b>Convenience</b>
           <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, nihil.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
           <b>Personalisation</b>
           <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque.</p>
        </div>
      </div>
    </div>
  )
}

export default About