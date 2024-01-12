import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { googleLogin } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleGoogleLogin = () => {
      dispatch(googleLogin());
      navigate('/');
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className="border-2 border-white/30 p-5 flex justify-center items-center gap-5 rounded-2xl cursor-pointer hover:bg-black"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="text-3xl" />
        <h1 className="text-white font-semibold">Sign in with Google</h1>
      </div>
    </div>
  );
}

export default Login;
