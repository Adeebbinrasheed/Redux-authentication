import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
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
          <h1>Sign In</h1>
          <h1 className="text-lg font-light">Hi welcome back</h1>
        </div>
        <div className="px-8 space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="py-2  w-full px-2 rounded-md"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />

          <input
            type="password"
            placeholder="Password"
            className="py-2 w-full px-2 rounded-md"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>
        {isLoading && <h2>  <svg
            className="animate-spin h-10 w-10 mr-3 border-t-2 border-b-2 border-blue-500 rounded-full"
            viewBox="0 0 24 24"
          ></svg></h2>}

        <input
          type="submit"
          className="bg-black text-white p-2 px-5 font-bold "
        />
        <h1>
          Don't have an account?  
           <a href="/register" className="text-blue-600">
            Sign Up
          </a>
        </h1>
      </form>
    </div>
  );
};

export default SignIn;
