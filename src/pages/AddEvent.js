import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from './api/api'
import { toast } from 'react-toastify'


const AddEvent = () => {

  const[event_name, setEvent_name] = useState('')
  const[event_description, setEvent_description] = useState('')
  const[event_date, setEvent_date] = useState('')
  const[event_location, setEvent_location] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/events/', 
        {event_name, event_description, event_date, event_location}
      )
      toast.success('Event added successfully')
      navigate('/app/home')
    } catch (error) {
      toast.error('Failed to add event')
      console.log(error)
    }
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Create Event</h1>
        <div className='w-full lg:w-1/3'>
          <form onSubmit={handleSubmit}>
            <div className='p-1'>
              <label htmlFor='ename'>Event Name
                <input
                  type='text'
                  required
                  placeholder='Event Name'
                  className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-700 focus:ring-blue-700 block w-full rounded-md sm:text-sm focus:ring-1'
                  value={event_name}
                  onChange={(e) => setEvent_name(e.target.value)}
                />
              </label>
            </div>
            <div className='p-1'>
              <label htmlFor='Email'>Event Details
                <textarea 
                  name="" id=""
                  required
                  placeholder='Event Description'
                  className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-700 focus:ring-blue-700 block w-full rounded-md sm:text-sm focus:ring-1'
                  value={event_description}
                  onChange={(e) => setEvent_description(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div className='p-1'>
              <label htmlFor='event_date'>Event Location
                <input
                  type='text'
                  required
                  placeholder='Location'
                  className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-700 focus:ring-blue-700 block w-full rounded-md sm:text-sm focus:ring-1'
                  value={event_location}
                  onChange={(e) => setEvent_location(e.target.value)}
                />
              </label>
            </div>
            <div className='p-1'>
              <label htmlFor='event_date'>Event Date
                <input
                  type='datetime-local'
                  required
                  placeholder='Date'
                  className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-700 focus:ring-blue-700 block w-full rounded-md sm:text-sm focus:ring-1'
                  value={event_date}
                  onChange={(e) => setEvent_date(e.target.value)}
                />
              </label>
            </div>
            <div className='p-1'>
              <button className='bg-blue-600 text-white px-5 py-1.5 rounded-lg hover:bg-blue-500'>Add Event</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddEvent
