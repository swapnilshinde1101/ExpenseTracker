import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import AuthLayout from '../../components/layout/AuthLayout';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (!fullName) {
      setError("Please enter your name");
      return;
    }
  
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
  
    setError("");
  
    try {
      let profileImageUrl = "";
  
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
  
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {  
        fullName,
        email,
        password,
        profileImageUrl
      });
  
      const { token, user } = response.data;
  
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  

  return (
    <AuthLayout>
      <div className='lg:w-[100%] max-w-2xl h-auto md:h-full mt-10 md:mt-0 mx-auto flex flex-col justify-center px-6'>
        <h3 className='text-2xl font-bold text-black mb-2'>Create an Account</h3>
        <p className='text-sm text-slate-700 mb-6'>
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          {error && (
            <p className="text-red-600 text-sm mt-2 mb-3">{error}</p>
          )}

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder='John Doe'
                type='text'
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                type="email"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>

            {/* Password */}
            <div className='col-span-2 flex flex-col'>
              <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 8 Characters"
                type="password"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto bg-violet-600 text-white px-6 py-2 mt-6 rounded-md hover:bg-violet-700 transition duration-200"
          >
            SIGN UP
          </button>

          <p className="text-sm text-slate-800 mt-4 text-center">
            Already have an account?{" "}
            <Link className='font-semibold text-violet-600 hover:underline' to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
