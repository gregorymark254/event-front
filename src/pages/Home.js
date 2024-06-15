import React, { useState, useEffect } from 'react'
import axios from './api/api'
import { Link } from 'react-router-dom'
import { MdEdit, MdDelete } from "react-icons/md";

const Home = () => {

  const [events,setEvents] = useState([])

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get('/events/')
        setEvents(response.data.events)
      } catch (error) {
        console.log(error)
      }
    }
    getEvents()
  },[])

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className='flex flex-wrap gap-2 items-center justify-between mt-4'>
          <h3 className='text-green-700 text-2xl font-bold'>Upcoming Events</h3>
          <div >
            <label htmlFor="search"><span className='hidden'>Search</span>
              <input 
                type="search" 
                id="search" 
                placeholder="Search events"
                className='px-3 py-1 border bg-[#f2f9ff] border-slate-300 placeholder-slate-400 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1'
              />
            </label>
          </div>
        </div>
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.event_id} className='mt-4'>
              <div className='flex flex-wrap items-center justify-between'>
                <div>
                  <h4 className='text-blue-600 text-xl font-bold'>{event.event_name}</h4>
                  <p>{event.event_description}</p>
                  <p>Event Date: {new Date(event.event_date).toISOString().replace('T', ' ').slice(0, 19)}</p>
                  <p>Event Location: {event.event_location}</p>
                </div>
                <div>
                  <Link className='bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500' to={`/app/event/${event.event_id}`}>R.S.V.P</Link>
                  <div className='flex items-center mt-4'>
                    <Link><span className='text-lg text-green-700'><MdEdit /></span></Link>
                    <Link><span className='text-lg text-red-700'><MdDelete /></span></Link>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))
        ) : ( <p>No events found</p>)}
      </div>
    </div>
  )
}

export default Home
