import { Routes, Route } from 'react-router-dom';
import AuthToken from './pages/Context/AuthToken';
import Login from './pages/Login'
import Nav from './pages/Nav/Nav'
import Home from './pages/Home'
import Events from './pages/Events'
import AddEvent from './pages/AddEvent'
import Attendance from './pages/Attendance'
import UpdateEvent from './pages/UpdateEvent'
import Users from './pages/Users'
import UpdateUser from './pages/UpdateUser'

const Layout = () => {
  const { accessToken, setAccessToken } = AuthToken();

  if (!accessToken) {
    return <Login setAccessToken={setAccessToken} />;
  }

  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UpdateUser />} />
        <Route path="/attendace/:id" element={<Attendance />} />
        <Route path="/eventdetails/:id" element={<UpdateEvent />} />
        <Route path="/event/:id" element={<Events />} />
      </Routes>
    </div>
  )
}

export default Layout
