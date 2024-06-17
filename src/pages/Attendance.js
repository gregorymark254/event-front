import React, { useState, useEffect } from 'react'
import axios from './api/api'
import { useParams } from 'react-router-dom'
import Pagination from '../Pagination'

const Attendance = () => {

  const [attendance, setAttendance] = useState([])
  const { id } = useParams()
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    const getAttendace = async () => {
      try {
        const offset = (currentPage - 1) * recordsPerPage;
        const response = await axios.get(`/attendance/${id}?offset=${offset}&limit=${recordsPerPage}`);
        setAttendance(response.data.attendance)
        setTotal(response.data.count)
      } catch (error) {
        console.log(error)
      }
    }
    getAttendace()
  },[id, currentPage, recordsPerPage])

  return (
    <div className="container mx-auto p-4">
      <div className='bg-slate-100 py-4 px-1.5'>
        <h1 className='font-bold text-xl text-blue-600'>Attendance List</h1>
      </div>
      <div className='mt-4'>
        {attendance.length > 0 ? (
          <div>
            <h3 className='p-2'>Showing {total} attendance</h3>
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
          </div>
        ) : (<span>NO DATA</span>)}
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

export default Attendance
