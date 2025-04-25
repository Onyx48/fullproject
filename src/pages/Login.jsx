import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { Logo } from "../components/Logo/Logo";
import { useForm } from "react-hook-form";
import authservice from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function Login() {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [error, setError] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    console.log("Login data from REACT HOOK FORM", data);
    setError("");
    console.log("Attempting login with data", data);
    try {
      const session = await authservice.login(data);
      if (session) {
        const userData = await authservice.login(data);
        console.log("Login Successful,session :", session);
        if (userdata) {
          dispatch(login({ userData: userData }));
          console.log("Dispatched Redux login action with userData:", userData);
        } else {
          console.error("Login succeeded but fialed to get user data");
          setError("failed to retrieve user data after login");

          return;
        }

        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(
        error.message || "Login failed.Please check credentials and try again"
      );
    }
  };

  const baseInputClass =
    "flex h-10 w-[470px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50";

  const hoverShadowClass = "hover:shadow-[inset_0_2px_4px_0_rgb(0_0_0_/_0.15)]";

  return (
    
      <div className="flex items-center justify-center w-full">
        <div className="mx-auto w-full max-w-lg rounded-xl border-black/10 bg-gray-200">
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Log In to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Dont have any account?{" "}
            <span className="font-medium text-primary transition-all duration-200 hover:underline">
              <Link to="/signup">Sign up </Link>
            </span>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
            <div className="space-y-5">
              <div className="flex flex-col items-center">
                <Input
                  label="Email :"
                  id="email"
                  placeholder="Enter Your Email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    validate: {
                      matchPatern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be a valid address",
                    },
                  })}
                  className={`${baseInputClass} ${
                    !isEmailFocused ? hoverShadowClass : ""
                  }`}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
              </div>
              <div className="flex flex-col items-center">
                <Input
                  label="Password :"
                  id="password"
                  placeholder="Enter Your Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`${baseInputClass} ${
                    !isPasswordFocused ? hoverShadowClass : ""
                  }`}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
              </div>
              <div className="flex justify-center flex-col items-center">
                <Button
                  type="submit"
                  className="inline-block  text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-base px-3.5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    
  );
}

export default Login;
