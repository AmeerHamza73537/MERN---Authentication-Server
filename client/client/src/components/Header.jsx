// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { AppContent } from '../context/AppContext'


// const Header = () => {
  
//   const {userData} = useContext(AppContent) 
  
//   return (
//     <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
//       <img src={assets.header_img} alt="Header Image" className='w-36 h-36 rounded-full mb-6'/>

//       <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
//         Hey {userData?.name || 'Seller'}! <img src={assets.hand_wave} alt='Handwave' className='w-8 aspect-square'/>
//       </h1>
//       <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our Seller board</h2>
//       <p className='mb-8 max-w-md'>
//         Lets start with a quick tour and we will have you up and running in no time
//       </p>
//       <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>
//         Get Started
//       </button>
//     </div>
//   )
// }

// export default Header
// // Hey !
import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'

const Header = () => {

  const { userData } = useContext(AppContent)

  return (
    <section className="mt-24 px-4 ">
      <div className="max-w-4xl mx-auto text-center bg-white/70 backdrop-blur-md border border-slate-200 rounded-3xl shadow-xl p-10">

        {/* Avatar */}
        <img
          src={assets.header_img}
          alt="Header"
          className="w-32 h-32 rounded-full mx-auto mb-6 shadow-md"
        />

        {/* Greeting */}
        <h1 className="flex justify-center items-center gap-2 text-xl sm:text-2xl text-slate-600 mb-2">
          Hey {userData?.name || 'Seller'}
          <img
            src={assets.hand_wave}
            alt="Wave"
            className="w-7 h-7"
          />
        </h1>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-5xl font-bold text-slate-800 mb-4 leading-tight">
          Welcome to your Seller Dashboard
        </h2>

        {/* Description */}
        <p className="text-slate-500 max-w-xl mx-auto mb-8">
          Let’s take a quick tour and get you set up to manage everything
          smoothly and efficiently.
        </p>

        {/* CTA */}
        <button
          className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700
                     text-white font-semibold shadow-lg hover:from-indigo-600
                     hover:to-indigo-800 transition"
        >
          Get Started
        </button>

      </div>
    </section>
  )
}

export default Header
