import React, { useState, useEffect, useCallback } from 'react'
import axios from './api/api'
import { toast } from 'react-toastify'
import { Link } from "react-router-dom";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import Pagination from '../Pagination'

const Users = () => {

  const [users,setUsers] = useState([])
  const [loading,setLoading]= useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [total, setTotal] = useState(0);


  // get all users
  const getUsers = useCallback(async () => {
    try {
      setLoading(true)
      const offset = (currentPage - 1) * recordsPerPage;
      const response = await axios.get(`/users/?offset=${offset}&limit=${recordsPerPage}`);
      setUsers(response.data.users)
      setTotal(response.data.count);
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  },[currentPage, recordsPerPage])

  useEffect(() => {
    getUsers()
  },[getUsers])

  // delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/users/delete/${id}`)
      toast.success('User Deleted')
      getUsers()
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete user')
    }
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <h3 className='text-xl font-bold text-blue-700'>Users</h3>
        <div className='mt-4'>
          {loading ? (
            <span>Loading.....</span>
          ) : (
            users.length > 0 ? (
              <div>
                <h2 className='p-4'>Showing {total} users</h2>
                <table className='w-full text-left table-auto'>
                  <thead>
                    <tr>
                      <th className='py-3 px-6'>No</th>
                      <th className='py-3 px-6'>UserName</th>
                      <th className='py-3 px-6'>Email</th>
                      <th className='py-3 px-6'>Role</th>
                      <th className='py-3 px-6'>Created At</th>
                      <th className='py-3 px-6'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className='py-2 px-6'>{user.id}</td>
                        <td className='py-2 px-6'>{user.username}</td>
                        <td className='py-2 px-6'>{user.email}</td>
                        <td className='py-2 px-6'>{user.role}</td>
                        <td className='py-2 px-6'>{new Date(user.created_at).toISOString().replace('T', ' ').slice(0, 19)}</td>
                        <td className='py-2 px-6'>
                          <span className="flex items-center space-x-2">
                            <Link to={`/app/users/${user.id}`} className='text-xl text-green-700'><MdModeEditOutline/></Link>
                            <button onClick={() => deleteUser(user.id)} className='text-xl text-red-700'><MdDelete /></button>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (<span>NO DATA</span>)
          )}
          <div className='flex flex-wrap items-center justify-between mt-2 p-4'>
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
    </div>
  )
}

export default Users
