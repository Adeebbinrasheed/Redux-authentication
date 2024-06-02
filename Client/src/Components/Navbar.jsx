import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useSelector,useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";


const Navbar = () => {
  const [open, setOpen] = useState(false);
const {userInfo}=useSelector((state)=>state.auth)

const navigate=useNavigate()
const dispatch=useDispatch()
const [logoutApiCall]=useLogoutMutation()

const handleLogout=async()=>{
  try {
    await logoutApiCall().unwrap()
    dispatch(logout())
    navigate('/')
  } catch (error) {
    console.log(error);
  }
}

  const isOpen=()=>{
    setOpen(!open)
  }
  return (
    <div>
      <nav className="flex justify-between items-center bg-black text-white p-3 px-6 md:px-8">
        <div>
          <h1 className="font-bold text-lg md:text-2xl">MERN-AUTH</h1>
        </div>
        
        <div onClick={isOpen} className="cursor-pointer sm:hidden">
            {open?<IoMdClose size={25}/>:<MdMenu size={25}/>}
          
        </div>
        <div className="space-x-5 hidden sm:block ">
          <Link to="/register" className="border-2 p-1 rounded-lg text-white border-blue-500">
            Sign Up
          </Link>
          <Link to="/login" className="border-2 p-1 rounded-lg text-white">
            Sign In
          </Link>
          <button onClick={handleLogout} className="bg-red-600 text-white p-1 rounded text-center">Logout</button>
        </div>
      </nav>

      {
        open && (
            <div className="flex flex-col justify-center items-center bg-black py-5 gap-4">
                <Link to="/register" className="border-2 p-1 rounded-lg text-white border-blue-500">
            Sign Up
          </Link>
          <Link to="/login" className="border-2 p-1 rounded-lg text-white">
            Sign In
          </Link>
            </div>
        )
      }

    </div>
  );
};

export default Navbar;
