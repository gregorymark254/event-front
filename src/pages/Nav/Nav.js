import React, {useState} from 'react'
import { FaBars } from "react-icons/fa"
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  // logout
  const signOut = () => {
    window.localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <main className="nav">
      <div className="bg-black text-white">
        <div className="container mx-auto p-4">
          <nav className='flex flex-wrap justify-between items-center px-4'>
            {/* Top Nav */}
            <span className="flex items-center space-x-2">
              <img width={60} height={60} src="https://mir-s3-cdn-cf.behance.net/projects/404/5103b6160224749.63afb8cae3fe4.png" alt="" />
              <h3 className='text-2xl font-bold'>Tech Events</h3>
            </span>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/app/home" className="nav-links">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/app/users" className="nav-links">Users</Link>
              </li>
              <li className="nav-item">
                <Link to="/app/add-event" className="nav-links">Add Event</Link>
              </li>
              <li className="nav-item">
                <a onClick={signOut} href="/#" className="nav-links">Logout</a>
              </li>
            </ul>
            <button className="nav-icon" onClick={handleClick}>
              <span><FaBars/></span>
            </button>
          </nav>
        </div>
      </div> 
    </main>
  )
}

export default Nav