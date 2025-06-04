import React from 'react'

function Navbar() {
  return (
    <div className='fixed top-0 left-0'>
        <div className='w-full fixed z-[999] px-20 py-8 flex justify-between items-center'>
        <div className='logo'>
        <img src="https://astronfinancials.com/_next/image?url=%2F_n…%2Fstatic%2Fmedia%2Flogo.c9ace2ad.png&w=1080&q=75" alt="" />
        </div>
        <div className='links flex gap-8 cursor-pointer' >
            {["Services", "Our Work", "About Us", "Insights", "Contact"].map((item, index)=>(
                <a key={index} className={`text-lg capitalize font-light ${index === 4 && "ml-35"}`}  >{item}</a>
            ))}
        </div>
    </div> 
    </div>
  )
}

export default Navbar