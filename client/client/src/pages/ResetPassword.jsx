import React, { useRef, useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

  const { backendUrl } = useContext(AppContent)
  axios.defaults.withCredentials = true

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)
  const [otp, setOtp] = useState('')

  const inputRefs = useRef([])

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

  const onSubmitEmail = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        backendUrl + '/api/auth/send-reset-otp',
        { email }
      )
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onSubmitOtp = (e) => {
    e.preventDefault()
    const otpValue = inputRefs.current.map(i => i.value).join('')
    setOtp(otpValue)
    setIsOtpSubmitted(true)
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        backendUrl + '/api/auth/reset-password',
        { email, otp, newPassword }
      )
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">

        {/* STEP 1 – EMAIL */}
        {!isEmailSent && (
          <>
            <h2 className="text-2xl font-bold text-center mb-2">
              Reset Password
            </h2>
            <p className="text-center text-sm text-slate-300 mb-8">
              Enter your registered email
            </p>

            <form onSubmit={onSubmitEmail} className="space-y-5">
              <InputField
                icon={assets.mail_icon}
                placeholder="Email address"
                value={email}
                onChange={setEmail}
                type="email"
              />

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 transition font-semibold shadow-lg">
                Send OTP
              </button>
            </form>
          </>
        )}

        {/* STEP 2 – OTP */}
        {isEmailSent && !isOtpSubmitted && (
          <>
            <h2 className="text-2xl font-bold text-center mb-2">
              Verify OTP
            </h2>
            <p className="text-center text-sm text-slate-300 mb-8">
              Enter the 6-digit code sent to your email
            </p>

            <form onSubmit={onSubmitOtp}>
              <div
                className="flex justify-between mb-8"
                onPaste={handlePaste}
              >
                {Array(6).fill(0).map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => inputRefs.current[index] = el}
                    type="text"
                    maxLength="1"
                    required
                    className="w-12 h-12 text-xl text-center rounded-lg bg-white/10 border border-white/20 text-white focus:border-indigo-500 outline-none transition"
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 transition font-semibold shadow-lg">
                Verify OTP
              </button>
            </form>
          </>
        )}

        {/* STEP 3 – NEW PASSWORD */}
        {isEmailSent && isOtpSubmitted && (
          <>
            <h2 className="text-2xl font-bold text-center mb-2">
              New Password
            </h2>
            <p className="text-center text-sm text-slate-300 mb-8">
              Create a strong new password
            </p>

            <form onSubmit={onSubmitNewPassword} className="space-y-5">
              <InputField
                icon={assets.lock_icon}
                placeholder="New password"
                value={newPassword}
                onChange={setNewPassword}
                type="password"
              />

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 transition font-semibold shadow-lg">
                Reset Password
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  )
}

/* Reusable Input */
const InputField = ({ icon, placeholder, value, onChange, type }) => (
  <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/10 border border-white/20 focus-within:border-indigo-500 transition">
    <img src={icon} className="w-5 opacity-80" />
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent outline-none text-white placeholder-slate-400"
      required
    />
  </div>
)

export default ResetPassword
