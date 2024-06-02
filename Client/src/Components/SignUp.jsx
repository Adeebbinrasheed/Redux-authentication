import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [register,{isLoading}]=useRegisterMutation()
  useEffect(()=>{
    if(userInfo){
      navigate('/')
    }
  },[navigate,userInfo])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password does not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/')
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <form
       onSubmit={handleSubmit}
        action=""
        className="flex flex-col space-y-10 bg-gray-300 mx-10 py-20  items-center rounded-md max-w-[75%] sm:max-w-[40%] md:max-w-[40%] lg:max-w-[25%]"
      >
        <div className="text-4xl font-semibold pb-6 text-center">
          <h1>Sign UP</h1>
          <p className="text-lg font-light ">welcome let's register</p>
        </div>
        <div className="px-8 space-y-6">
          <input
            type="text"
            placeholder="Name"
            className="py-2 w-full px-2 rounded-md"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />

          <input
            type="email"
            placeholder="Email"
            className="py-2  w-full px-2 rounded-md"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />

          <input
            type="password"
            name=""
            id=""
            placeholder="Password"
            className="py-2 w-full px-2 rounded-md"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="py-2 w-full px-2 rounded-md"
            onChange={(event) => setConfirmPassword(event.target.value)}
            value={confirmPassword}
          />
        </div>

        {isLoading && <h2><svg
            className="animate-spin h-10 w-10 mr-3 border-t-2 border-b-2 border-blue-500 rounded-full"
            viewBox="0 0 24 24"
          ></svg></h2>}

        <input
          type="submit"
          className="bg-black text-white p-2 px-5 font-bold "
         
        />

        <h1>
          Already have account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </h1>
      </form>
    </div>
  );
};

export default SignUp;
