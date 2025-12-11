import React from 'react'
import { User, Lock } from 'lucide-react';

// Wrapper to wrap the whole page, probably
const AuthLayout = ({ children, title, subtitle }) => {
  return (

    <div className='min-h-screen flex items-center justify-center p-4  bg-green-50'>
      {/* white login card */}
      <div className= 'rounded-2xl shadow-xl w-full max-w-md border border-green-100 bg-white p-8'>

        {/* section for the header */}
        <div className='text-center mb-8'>
          {title && (
            <h2 className='text-2xl font-bold text-gray-800'>{title}</h2>
          )}
          {subtitle && (
            <p className="text-sm mt-2 text-gray-500">{subtitle}</p>
          )}
        </div>

        {/* input fields */}
        {children}
      
      </div>
    </div>
  )
}

const InputField = ({ label, type, placeholder, icon }) => {
  return (
    <div className="mb-4">
      {/* Label Text */}
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>

      {/* The Input Container */}
      <div className='relative'>

        {/* Icon */}
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400'>
          {icon}
        </div>

        {/* Input Field */}
        <input
          type={type}
          className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white sm:text-sm'
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default function App(){
  return(
    // testing layout
    <AuthLayout title="Welcome Back" subtitle="Monitor your growth">
      {/* testing input fields */}
      <InputField
        label="Email Address"
        type="email"
        placeholder="john@gmail.com"
        icon={<User size="18" />}
      />

      {/* NEW: Password Field */}
      <InputField 
        label="Password" 
        type="password" 
        placeholder="••••••••" 
        icon={<Lock size={18} />} 
      />
    </AuthLayout>
  )
}