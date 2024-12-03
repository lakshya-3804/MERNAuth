import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Navigate, redirect, useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../redux/slices/ProfileSlice";

export default function Header() {
    const isLoggedIn = useSelector(state => state.checkAuth.isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = async () => {
      try {
        // sending a post request to server to signOut
        const res = await fetch('http://localhost:1234/api/v1/signout', {
          method: 'POST',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'},
        });
        // handle error
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        dispatch(setIsLoggedIn(false));   // state management
        navigate('/signIn');  // navigate to signIn page

      } catch (error) {
        console.log(error.message);
      }
    };

    return (
      <div className="bg-gray-900 sticky w-full border-b border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">     
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">MERN-Auth</span>
          </Link>
          {isLoggedIn ? (
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button onClick={handleSignOut} type="button" className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Log Out</button>
          </div>
          ) : null}
          <div className=" flex  items-center justify-between w-auto order-1" id="navbar-sticky">
            {isLoggedIn ? (
              <ul className="flex  flex-col  p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink to="/home" className={({ isActive }) => `${isActive ? 'text-blue-500' : 'text-white'} block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={({ isActive }) => `${isActive ? 'text-blue-500' : 'text-white'} block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>About</NavLink>
                </li>
              </ul>
            ) :(
              <ul className="flex flex-col  p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink to="/signIn" className={({ isActive }) => `${isActive ? 'text-blue-700' : 'text-white'} block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>SignIn</NavLink>
                </li>
                <li>
                  <NavLink to="/signUp" className={({ isActive }) => `${isActive ? 'text-blue-700' : 'text-white'} block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Register</NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    )
}