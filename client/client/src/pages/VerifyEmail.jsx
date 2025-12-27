import React, { useEffect, useRef, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const VerifyEmail = () => {

  const navigate = useNavigate()
  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContent)

  const inputRefs = useRef([])
  axios.defaults.withCredentials = true

  const handleInput = (e, index) => {
    if (e.target.value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').slice(0, 6)
    paste.split('').forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const otp = inputRefs.current.map(i => i.value).join('')
      const { data } = await axios.post(
        backendUrl + '/api/auth/verify-account',
        { otp }
      )

      if (data.success) {
        toast.success(data.message)
        getUserData()
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isLoggedIn && userData?.isAccountVerified) {
      navigate('/')
    }
  }, [isLoggedIn, userData, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6">
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">

        <h2 className="text-2xl font-bold text-center mb-2">
          Verify Your Email
        </h2>

        <p className="text-center text-sm text-slate-300 mb-8">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={onSubmitHandler}>
          <div
            className="flex justify-between mb-8"
            onPaste={handlePaste}
          >
            {Array(6).fill(0).map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                required
                className="w-12 h-12 text-xl text-center rounded-lg bg-white/10
                           border border-white/20 text-white
                           focus:border-indigo-500 outline-none transition"
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700
                       hover:from-indigo-600 hover:to-indigo-800 transition font-semibold shadow-lg"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  )
}

export default VerifyEmail
