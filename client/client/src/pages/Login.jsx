import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { backendUrl, setisLoggedIn, getUserData } = useContext(AppContent)

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      axios.defaults.withCredentials = true

      if (state === 'Sign Up') {
        const { data } = await axios.post(
          backendUrl + '/api/auth/register',
          { name, email, password }
        )

        if (data.success) {
          setisLoggedIn(true)
          getUserData()
          navigate('/')
        } else toast.error(data.message)
      } else {
        const { data } = await axios.post(
          backendUrl + '/api/auth/login',
          { email, password }
        )

        if (data.success) {
          setisLoggedIn(true)
          getUserData()
          navigate('/')
        } else toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6">
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">

        <h2 className="text-3xl font-bold text-center mb-2">
          {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
        </h2>

        <p className="text-center text-sm text-slate-300 mb-8">
          {state === 'Sign Up'
            ? 'Sign up to get started'
            : 'Login to continue'}
        </p>

        <form onSubmit={onSubmitHandler} className="space-y-4">

          {state === 'Sign Up' && (
            <InputField
              icon={assets.person_icon}
              placeholder="Full Name"
              value={name}
              onChange={setName}
              type="text"
            />
          )}

          <InputField
            icon={assets.mail_icon}
            placeholder="Email Address"
            value={email}
            onChange={setEmail}
            type="email"
          />

          <InputField
            icon={assets.lock_icon}
            placeholder="Password"
            value={password}
            onChange={setPassword}
            type="password"
          />

          <div className="text-right">
            <span
              onClick={() => navigate('/reset-password')}
              className="text-sm text-indigo-400 hover:text-indigo-300 cursor-pointer transition"
            >
              Forgot password?
            </span>
          </div>

          <button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700
            hover:from-indigo-600 hover:to-indigo-800 transition font-semibold shadow-lg"
          >
            {state}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            {state === 'Sign Up' ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  )
}

/* 🔹 Reusable Input Component */
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

export default Login
