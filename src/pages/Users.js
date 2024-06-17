import React, { useState, useEffect } from 'react'
import axios from './api/api'
import { toast } from 'react-toastify'
import { Link } from "react-router-dom";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

const Users = () => {

  const [users,setUsers] = useState([])
  const [loading,setLoading]= useState(false)


  // get all users
  const getUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/users/')
      setUsers(response.data.users)
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  },[])

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
        <div className='mt-4 bg-slate-100'>
          {loading ? (
            <span>Loading.....</span>
          ) : (
            users.length > 0 ? (
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
            ) : (<span>NO DATA</span>)
          )}
        </div>
      </div>
    </div>
  )
}

export default Users
