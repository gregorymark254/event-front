import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from './api/api'
import { toast } from 'react-toastify'

const Events = () => {

  const { id } = useParams()
  const[first_name, setFirst_name] = useState('')
  const[last_name,setLast_name] = useState('')
  const[email, setEmail] = useState('')
  const[phone, setPhone] = useState('')
  const[event_id, setEvent_id] = useState(id)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/attendance/', 
        {first_name, last_name, email, phone,event_id}
      )
      toast.success('Attendance recorded successfully')
      navigate('/app/home')
    } catch (error) {
      toast.error('Failed to reserve attendance')
      console.log(error)
    }
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Reserve a seat</h1>
        <div className='w-full lg:w-1/3'>
          <form onSubmit={handleSubmit}>
            <div className='p-1 hidden'>
              <label htmlFor='id'>id
                <input
                  type='number'
                  required
                  placeholder='Event Id'
                  className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-700 focus:ring-blue-700 block w-full rounded-md sm:text-sm focus:ring-1'
                  value={event_id}
                  onChange={(e) => setEvent_id(e.target.value)}
                />
              </label>
            </div>
            <div className='p-1'>
              <label htmlFor='fname'>First Name
                <input
                  type='text'
                  required
                  placeholder='First Name'
                  className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-700 focus:ring-blue-700 block w-full rounded-md sm:text-sm focus:ring-1'
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                />
              </label>
            </div>
            <div className='p-1'>
              <label htmlFor='lname'>Last Name
                <input
                  type='text'
                  required
                  placeholder='Last Name'
                  className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-700 focus:ring-blue-700 block w-full rounded-md sm:text-sm focus:ring-1'
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value)}
                />
              </label>
            </div>
            <div className='p-1'>
              <label htmlFor='Email'>Email
                <input
                  type='email'
                  required
                  placeholder='Email Address'
                  className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-700 focus:ring-blue-700 block w-full rounded-md sm:text-sm focus:ring-1'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className='p-1'>
              <label htmlFor='phone'>Phone Number
                <input
                  type='number'
                  required
                  placeholder='Phone Number'
                  className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-700 focus:ring-blue-700 block w-full rounded-md sm:text-sm focus:ring-1'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
            </div>
            <div className='p-1'>
              <button className='bg-blue-600 text-white px-5 py-1.5 rounded-lg hover:bg-blue-500'>Reserve Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Events
