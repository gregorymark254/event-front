import React, { useState, useEffect } from 'react'
import axios from './api/api'
import { Link } from 'react-router-dom'
import { MdEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import {toast} from 'react-toastify'
import Pagination from '../Pagination'

const Home = () => {

  const [events,setEvents] = useState([])
  const [loading,setLoading]= useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchEvent, setSearchEvent] = useState('')
  const [total, setTotal] = useState(0);

  // debounce for search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(true);
      getEvents((currentPage - 1) * recordsPerPage, recordsPerPage, searchEvent);
    }, 500);
    return () => clearTimeout(timerId);
  }, [currentPage, recordsPerPage, searchEvent]);


  const getEvents = async (offset,limit,search) => {
    try {
      setLoading(true)
      const response = await axios.get(`/events/?offset=${offset}&limit=${limit}&search=${search}`);
      setEvents(response.data.events)
      setTotal(response.data.count);
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  // Search event
  const handleSearchChange = (e) => {
    setSearchEvent(e.target.value);
    setCurrentPage(1);
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`/events/delete/${id}`)
      toast.success('Event Deleted')
      getEvents()
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete')
    }
  }

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
                value={searchEvent}
                onChange={handleSearchChange}
              />
            </label>
          </div>
        </div>
        {loading ? (
          <h2 className='text-xl m-4'>Loading....</h2>
        ) : (
          events.length > 0 ? (
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
                      <Link to={`/app/attendace/${event.event_id}`}><span className='text-lg text-blue-700'><FaEye /></span></Link>
                      <Link to={`/app/eventdetails/${event.event_id}`}><span className='text-lg text-green-700'><MdEdit /></span></Link>
                      <button onClick={() => deleteEvent(event.event_id)} className='text-lg text-red-700'><MdDelete /></button>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))
          ) : ( 
          <p>No events found</p>
        ))}
        <div className='flex flex-wrap items-center justify-between mt-4'>
          <div>
            <span className='mr-2'>Records per page:</span>
            <select
              className='px-3 py-1 border bg-[#f2f9ff] border-slate-300 rounded-md focus:outline-none focus:border-[#85d6e3] focus:ring-[#85d6e3]'
              value={recordsPerPage}
              onChange={(e) => {
                setRecordsPerPage(parseInt(e.target.value, 10));
                setCurrentPage(1);
              }}
            >
              <option value='10'>10</option>
              <option value='50'>50</option>
              <option value='75'>75</option>
              <option value='100'>100</option>
            </select>
          </div>
          <Pagination
            nPages={Math.ceil(total / recordsPerPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
