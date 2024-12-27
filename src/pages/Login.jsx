"use client";

import axios from "axios";
// import { useRouter } from "next/router";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import Image from "next/image";

export default function Login() {
  const [formdata, setFormdta] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handlchange = (e) => {
    const { name, value } = e.target;
    setFormdta({ ...formdata, [name]: value });
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      console.log(formdata);
      const response = await axios.post(
        "https://gym-backend-4kei.onrender.com/api/login",
        formdata
      );
      localStorage.setItem("token", response.data.token);
      console.log(response.data);

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          //   router.push("/dashboard");
          navigate("/dashboard");
        }, 1000); // Wait for the toast duration (3000ms)
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff]">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Log in to your dashboard
        </h1>
        <h1 className="text-2xl absolute top-10 left-10  font-semibold text-center text-gray-700">
          Fittr Dashboard
        </h1>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handlchange} // Use the `handlchange` function
            value={formdata.email}
            placeholder="Enter your email"
            className="mt-1 block w-full rounded-md px-5 py-5 border border-gray-300 shadow-sm  focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handlchange} // Use the `handlchange` function
            value={formdata.password}
            placeholder="Enter your password"
            className="mt-1 block w-full rounded-md px-5 py-5 border border-gray-300 shadow-sm  focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          {/* <Link href={"/dashboard"}> */}
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 text-white bg-[#007AFF] rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            {loading ? "Loggin in..." : "login"}
          </button>
          {/* </Link> lkjfhasdlfhaslkdfaslkdfjasd */}
        </div>
      </div>
    </div>
  );
}
