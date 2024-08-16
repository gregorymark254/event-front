import React, { useState } from 'react';
import axios from './api/api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // sign up function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      toast('Passwords do not match.');
      setLoading(false);
      return;
    }
    if (password.length < 8 || confirmPassword.length < 8) {
      toast('Password must be more than 8 characters');
      setLoading(false)
      return;
    }
    try {
      await axios.post('/auth/register',
        { username, email, role, password }
      );
      toast.success('Registration Successful');
      navigate('/login');
    } catch (error) {
      if(error.response.status === 400){
        toast.error(error.response.data.error)
      } else {
        toast.error('Registration Error');
      }
      console.log(error.response);
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className='bg-green-700'>
        <div className='mx-auto p-4'>
          <div className='flex items-center justify-center h-screen'>
            <div className='p-4 bg-white w-full xl:w-1/3 rounded-md'>
              <form onSubmit={handleSubmit} className='w-full'>
                <div className='text-center py-2'>
                  <h3 className='font-bold'>Event Management</h3>
                  <p>Create Your Account Here!</p>
                </div>
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
                  <label htmlFor='role'><span className='hidden'>Role</span>
                    <input
                      type='test'
                      required
                      placeholder='Role'
                      className='mt-2 px-3 py-2 hidden bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-700 focus:ring-green-700 w-full rounded-md sm:text-sm focus:ring-1'
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor='Password'><span className='hidden'>Password</span>
                    <input
                      type='password'
                      required
                      placeholder='Password'
                      className='mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-700 focus:ring-green-700 block w-full rounded-md sm:text-sm focus:ring-1'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor='Password'><span className='hidden'>Confirm Password</span>
                    <input
                      type='password'
                      required
                      placeholder='Comfirm Password'
                      className='mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-700 focus:ring-green-700 block w-full rounded-md sm:text-sm focus:ring-1'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </label>
                </div>
                <div className='text-center py-3'>
                  <button type='submit' disabled={loading} className='px-6 py-2 bg-green-700 text-white hover:bg-green-600 rounded-md w-full disabled:bg-green-700'>{loading ? 'Please wait...' : 'Sign Up'}</button>
                </div>
                <div>
                  <span>Already have an account? <u className='text-blue-600 hover:text-blue-800'><Link to='/login'>Sign In Here</Link></u></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
