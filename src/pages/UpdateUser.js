import React, { useState, useEffect } from 'react'
import axios from './api/api'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateUser = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const{ id } = useParams()
  const navigate = useNavigate()

  // get user by id
  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`/users/${id}`)
        setUsername(response.data.username)
        setEmail(response.data.email)
        setRole(response.data.role)
      } catch (error) {
        console.log(error)
      }
    }
    getUserById()
  },[id])

  // update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/update/${id}`,
        { username, email, role }
      );
      toast.success('User updated');
      navigate('/app/users')
    } catch (error) {
      toast.error('Failed to update user');
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'><span className='hidden'>Full username</span>
              <input
                type='text'
                required
                placeholder='Full Names'
                className='mt-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-700 focus:ring-green-700 block w-full rounded-md sm:text-sm focus:ring-1'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor='Email'><span className='hidden'>Email</span>
              <input
                type='email'
                required
                placeholder='Email Address'
                className='mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-700 focus:ring-green-700 block w-full rounded-md sm:text-sm focus:ring-1'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="role"><span className='hidden'>Role</span>
              <select 
                name="" id=""
                className='mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-700 focus:ring-green-700 block w-full rounded-md sm:text-sm focus:ring-1'
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </label>
          </div>
          <div className='mt-2'>
            <button className='bg-blue-700 text-white px-5 py-2 rounded-lg'>Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser
