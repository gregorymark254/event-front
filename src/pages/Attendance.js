import React, { useState, useEffect } from 'react'
import axios from './api/api'
import { useParams } from 'react-router-dom'

const Attendance = () => {

  const [attendance, setAttendance] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const getAttendace = async () => {
      try {
        const response = await axios.get(`/attendance/${id}`)
        setAttendance(response.data.attendance)
      } catch (error) {
        console.log(error)
      }
    }
    getAttendace()
  },[id])

  return (
    <div className="container mx-auto p-4">
      <div className='bg-slate-100 py-4 px-1.5'>
        <h1 className='font-bold text-xl text-blue-600'>Attendance List</h1>
      </div>
      <div className='mt-4 bg-slate-100'>
        {attendance.length > 0 ? (
          <table className='w-full text-left table-auto'>
            <thead>
              <tr>
                <th className='py-3 px-6'>No</th>
                <th className='py-3 px-6'>First Name</th>
                <th className='py-3 px-6'>Last Name</th>
                <th className='py-3 px-6'>Email</th>
                <th className='py-3 px-6'>Phone</th>
                <th className='py-3 px-6'>Event Name</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((attend) => (
                <tr key={attend.attendance_id}>
                  <td className='py-2 px-6'>{attend.attendance_id}</td>
                  <td className='py-2 px-6'>{attend.first_name}</td>
                  <td className='py-2 px-6'>{attend.last_name}</td>
                  <td className='py-2 px-6'>{attend.email}</td>
                  <td className='py-2 px-6'>{attend.phone}</td>
                  <td className='py-2 px-6'>{attend.event_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (<span>NO DATA</span>)}
      </div>
    </div>
  )
}

export default Attendance
