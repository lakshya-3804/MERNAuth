import { useState } from "react";
import {useDispatch} from 'react-redux';
import { setIsLoggedIn } from '../redux/slices/ProfileSlice.js';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {auth,provider} from '../firebase.js';
import { signInWithPopup } from "firebase/auth";

// sign up page
export default function SignUp() {
    // form data
    const [username , setUsername] = useState("");
    const [email , setEmail] = useState("");  
    const [password , setPassword] = useState("");

    const dispatch = useDispatch();   // redux state management

    // handle form submission
    const handleSubmit = async (e)=>{
      e.preventDefault();   // prevent form data from being reset
      try{
        // send post request to server with form data
        const res = await fetch("http://localhost:1234/api/v1/signup",{
          method : 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username,email,password}),
        });
        // handle error
        if (!res.ok) {
          throw new Error("Something went wrong in signup")
        }
        const data = res.json();  // Handle response data if required
        dispatch(setIsLoggedIn(true));  // logging in user once registered successfully
        // reset the signUp form input fields
        setUsername("");
        setEmail("");
        setPassword("");

      } catch(e){
        // alert error
        Swal.fire({
          title: "Sign Up failed",
          text: "Something went wrong",
          icon: "warning"
        });
      }
    } 

    const handleGoogleSignUp = async ()=>{
      const gdata = await signInWithPopup(auth,provider);
      try{
        // send post request to server with data
        const res = await fetch("http://localhost:1234/api/v1/signup/google",{
          method : 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: gdata.user.displayName,
            email: gdata.user.email})
        });
        // handle error
        if (!res.ok) {
          throw new Error("Something went wrong in signup")
        }
        const data = res.json();  // Handle response data if required
        dispatch(setIsLoggedIn(true));  // logging in user once registered successfully

      } catch(e){
        // alert error
        Swal.fire({
          title: "Sign Up failed",
          text: "Something went wrong",
          icon: "warning"
        });
      }
    }

    return (       
      <div className="mx-auto mt-[60px] w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Register to our platform</h5>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-7">
          <div className="mb-5">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
            <input value={username} autoComplete="on" onChange={(e)=>{setUsername(e.target.value)}} type="text" id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input value={email} autoComplete="on" onChange={(e)=>{setEmail(e.target.value)}} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="abcd@gmail.com" required />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
            </div>
            <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
          </div>
          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
          <div className="flex flex-col justify-evenly items-center gap-[10px] mt-[10px] ">
            <button type="button" onClick={handleGoogleSignUp} className=" inline-flex w-full  items-center justify-center rounded-md text-white bg-black/50 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <span className="mr-2 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 120 120">
                  <path d="M107.145,55H100H87.569H60v18h27.569c-1.852,5.677-5.408,10.585-10.063,14.118 C72.642,90.809,66.578,93,60,93c-12.574,0-23.278-8.002-27.299-19.191C31.6,70.745,31,67.443,31,64 c0-3.839,0.746-7.505,2.101-10.858C37.399,42.505,47.823,35,60,35c7.365,0,14.083,2.75,19.198,7.273l13.699-13.21 C84.305,20.969,72.736,16,60,16c-18.422,0-34.419,10.377-42.466,25.605C14,48.291,12,55.912,12,64c0,7.882,1.9,15.32,5.267,21.882 C25.223,101.389,41.372,112,60,112c12.382,0,23.668-4.688,32.182-12.386C101.896,90.831,108,78.128,108,64 C108,60.922,107.699,57.917,107.145,55z" opacity=".35"></path><path fill="#44bf00" d="M17.267,81.882C25.223,97.389,41.372,108,60,108c12.382,0,23.668-4.688,32.182-12.386L77.506,83.118 C72.642,86.809,66.577,89,60,89c-12.574,0-23.278-8.002-27.299-19.191L17.267,81.882z"></path><path d="M77.506,83.118c-0.684,0.553-1.685,1.158-2.398,1.638l14.711,12.846 c0.807-0.641,1.6-1.298,2.363-1.988L77.506,83.118z" opacity=".35"></path><path fill="#0075ff" d="M92.182,95.614C101.896,86.83,108,74.128,108,60c0-3.078-0.301-6.083-0.855-9H100H87.569H60v18 h27.569c-1.852,5.677-5.408,10.585-10.063,14.118L92.182,95.614z"></path><path d="M32.701,69.809L17.267,81.882c0.486,0.948,1.004,1.877,1.551,2.787l15.3-11.576 C33.63,72.181,33.05,70.804,32.701,69.809z" opacity=".35"></path><path fill="#ffc400" d="M17.267,81.882C13.9,75.32,12,67.882,12,60c0-8.088,2-15.709,5.534-22.395l15.568,11.537 C31.746,52.496,31,56.161,31,60c0,3.443,0.6,6.745,1.701,9.809L17.267,81.882z"></path><path d="M17.534,37.605c-0.482,0.844-1.169,2.36-1.564,3.251l16.059,11.491 c0.299-1.095,0.653-2.167,1.072-3.205L17.534,37.605z" opacity=".35"></path><path fill="#ff1200" d="M33.101,49.142C37.399,38.505,47.823,31,60,31c7.365,0,14.083,2.75,19.198,7.273l13.699-13.21 C84.305,16.969,72.736,12,60,12c-18.422,0-34.419,10.377-42.466,25.605L33.101,49.142z"></path>
                </svg>
              </span>
              Sign up with Google
            </button>
            {/* <button type="button" className=" inline-flex w-full  items-center justify-center rounded-md text-white bg-black/50 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <span className="mr-2 inline-block">
                <svg className="text-[#2563EB]" height="30" width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                </svg>
              </span>
              Sign up with Facebook
            </button> */}
          </div>
        </form>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-5">
          Already registered? <Link to="/signIn" className="text-blue-700 hover:underline dark:text-blue-500">Sign In</Link>
        </div>
      </div>

    )
};