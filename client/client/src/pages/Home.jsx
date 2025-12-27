import React from 'react'
import Navbar from '../components/nAVBAR.JSX'
import Header from '../components/Header.jsx'

const Home = () => {
  return (
    // <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
    //   <Navbar/>
    //   <Header/>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100">
  <Navbar />
  <Header />
</div>

  )
}

export default Home
