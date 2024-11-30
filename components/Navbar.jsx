import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex bg-indigo-900 justify-around p-2'>
        <div className='logo'>
            <span className='font-bold text-xl text-white mx-8'>iTask</span>
        </div>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold text-white transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold text-white transition-all'>Your Tasks</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
