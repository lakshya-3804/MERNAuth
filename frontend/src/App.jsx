
import { BrowserRouter, Routes ,Route, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Header from './components/Header.jsx'
import SignUp from './pages/SignUp.jsx'
import {useSelector} from 'react-redux'
import { Page404 } from './pages/Page404.jsx'


function App() {
  const isLoggedIn = useSelector(state => state.checkAuth.isLoggedIn);

  return (
    <BrowserRouter>
      <Header />
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} replace={true} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div className='text-5xl text-center my-[30vh]'>404 Not found</div>} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to={"/signIn"} replace={true} />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<Page404 />} />
          {/* <Route path="*" element={<div className='text-5xl text-center my-[30vh]'>404 Not found</div>} /> */}
        </Routes>
      )}
    </BrowserRouter>
    
  )
}

export default App
