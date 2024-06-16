import React, { useState, useEffect } from 'react';
import axios from './api/api';
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import AuthToken from './Context/AuthToken';

const Login = ({ setAccessToken }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Login function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await axios.post('/auth/login',
        { email, password }
      );
      toast.success('Login Successful');
      navigate('/app/home');
      setAccessToken(token);
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (AuthToken) {
      navigate('/app/home');
    }
  }, [navigate]);

  return (
    <main>
      <div className='bg-green-700'>
        <div className='mx-auto p-4'>
          <div className='flex items-center justify-center h-screen'>
            <div className='p-4 bg-white w-full xl:w-1/3 rounded-md'>
              <form onSubmit={handleSubmit} className='w-full'>
                <div className='text-center py-2'>
                  <h3 className='font-bold'>Event Management</h3>
                  <p>Please sign-in to your account to continue.</p>
                </div>
                <div>
                  <label htmlFor='Email'><span className='hidden'>Email</span>
                    <input
                      type='email'
                      required
                      placeholder='Email Address'
                      className='mt-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-700 focus:ring-green-700 block w-full rounded-md sm:text-sm focus:ring-1'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                <div className='text-center py-3'>
                  <button type='submit' disabled={loading} className='px-6 py-2 bg-green-700 text-white hover:bg-green-600 rounded-md w-full disabled:bg-green-700'>{loading ? 'Please wait...' : 'Login'}</button>
                </div>
                <div>
                  <span>Don't have an account? <u className='text-blue-600 hover:text-blue-800'><Link to='/signup'>Sign Up</Link></u></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

Login.propTypes = {
  setAccessToken: PropTypes.func
};
