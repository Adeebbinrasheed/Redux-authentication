import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useUpdateuserMutation } from "../slices/usersApiSlice";


const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateuser,{isLoading}]=useUpdateuserMutation()

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.setName, userInfo.setEmail]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password does not match");
    } else {
      try {
        const res=await updateuser({
            _id:userInfo._id,
            name,
            email,
            password
        }).unwrap()
        dispatch(setCredentials({...res}))
        toast.success('profile updated successfully')
      } catch (error) {
        toast.error(error.data.message || error.error)  
      }
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col space-y-10 bg-gray-500 mx-10 py-20  items-center rounded-md max-w-[75%] sm:max-w-[40%] md:max-w-[40%] lg:max-w-[25%]"
      >
        <div className="text-4xl font-semibold pb-6 text-center ">
          <h1>Update profile</h1>
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

        <input
          type="submit"
          className="bg-black text-white p-2 px-5 font-bold "
        />

      </form>
    </div>
  );
};

export default ProfileScreen;
