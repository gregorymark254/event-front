import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Signup from './pages/Signup'
import Layout from './Layout'
import AuthToken from './pages/Context/AuthToken';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { setAccessToken } = AuthToken();

  return (
    <main>
      <ToastContainer position='top-center' limit={3} />
      <Routes>
        <Route path='/' element={<Login setAccessToken={setAccessToken} />} />
        <Route path='/login' element={<Login setAccessToken={setAccessToken} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/app/*' element={<Layout />} />
      </Routes>
    </main>
  );
}

export default App;
