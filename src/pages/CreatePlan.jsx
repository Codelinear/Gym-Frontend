"use client";
// import AddWorkoutToPlan from "@/Components/plan/AddWorkoutToPlan";
import React, { useEffect } from "react";
import { useState } from "react";
import AddWorkoutToPlan from "./AddWorkoutToPlan";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const CreatePlan = () => {
  // const [name, setname] = useState("");
  // const [calories, setcalories] = useState("");
  // const [duration, setDuration] = useState("");
  // const [difficulty, setDifficulty] = useState("Easy");

  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const [formData, setFormData] = useState({
    name: "",
    calories: "",
    duration: "",
    difficulty: "",
    date: "",
    workouts,
  });

  useEffect(() => {
    async function fetchWorkoutData() {
      if (id) {
        const res = await axios.get(
          `https://gym-backend-4kei.onrender.com/api/plan/${id}`
        );
        console.log(res.data);
        console.log(res.data.workouts);
        setFormData({
          name: res.data.name,
          calories: res.data.calories,
          duration: res.data.duration,
          difficulty: res.data.difficulty,
          workouts: res.data.workouts,
          date: res.data.date,
        });
      }
    }
    fetchWorkoutData();
  }, [id]);
  console.log(formData.workouts);

  const handleAddWorkout = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]); // Add the new workout to the workouts array
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      if (id) {
        // Update existing workout
        const response = await axios.put(
          `https://gym-backend-4kei.onrender.com/api/plan/${id}`,
          // `https://gym-backend-4kei.onrender.com/api/plan/${id}`,
          formData
        );
        // alert("Workout updated successfully!");
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
        }
      } else {
        // Create a new workout
        const { name, calories, duration, difficulty, date } = formData;

        const tosend = {
          name,
          calories,
          duration,
          difficulty,
          date,
          workouts,
        };
        console.log(tosend);
        const response = await axios.post(
          // "https://gym-backend-4kei.onrender.com/api/plan",
          "http://localhost:8000/api/plan",
          tosend
        );
        // alert("Workout added successfully!");
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
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message, {
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
      setIsLoading(false); // Set loading to false after the request completes
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="min-h-screen  flex flex-col items-center justify-start">
        <div className="w-full max-w-[1285px] mx-auto  rounded-lg  p6">
          {/* Header */}
          <div className="flex justify-between items-center my-6 bg-[#fff] p-4">
            <Link
              to="/plan"
              className="text-blue-500 text-sm flex items-center"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.2998 15.7L20.2998 25.7L21.6998 24.3L13.0998 15.7L21.6998 7.09998L20.2998 5.69998L10.2998 15.7Z"
                  fill="#007AFF"
                />
              </svg>
              Go Back
            </Link>
            <button
              onClick={handleSubmit}
              className="px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isLoading ? "Saving..." : id ? "Update Workout" : "Save Changes"}
            </button>
          </div>

          {/* Form */}
          {/* <form onSubmit={handleSubmit} className="bg-white p-4 mb-10"> */}
          {/* Plan Information */}
          <h2 className="text-xl font-semibold mb-4 max-md:ml-5">
            {id ? "Edit Plan" : "Add Plan"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-white p-10">
            {/* Workout Name */}
            <div className="mb-10">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workout name
              </label>
              <input
                type="text"
                placeholder="Workout name"
                name="name"
                value={formData.name}
                // onChange={(e) => setname(e.target.value)}

                onChange={handleInputChange}
                className="w-full border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Calories Burnt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calories burnt (in kCal)
              </label>
              <input
                type="number"
                name="calories"
                placeholder="350"
                value={formData.calories}
                // onChange={(e) => setcalories(e.target.value)}
                onChange={handleInputChange}
                className="w-full border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated duration (min)
              </label>
              <input
                type="number"
                placeholder="40"
                name="duration"
                value={formData.duration}
                // onChange={(e) => setDuration(e.target.value)}
                onChange={handleInputChange}
                className="w-full border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                name="difficulty"
                // onChange={(e) => setDifficulty(e.target.value)}
                onChange={handleInputChange}
                className="w-full border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                // onChange={(e) => setDuration(e.target.value)}
                onChange={handleInputChange}
                className="w-full border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Workouts */}
          {/* </form> */}
          <div className="bg-white pl-10 pt-10">
            <h2 className="text-xl font-semibold mb-4">Workouts</h2>
            <div className="flex items-center">
              {id ? (
                ""
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add workout
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4 bg-white pl-10 pt-2 pb-10">
            {/* Conditional Rendering: Show div or text based on `id` */}
            {id ? (
              <div className="w-[50%]">
                {formData?.workouts?.length === 0 ? (
                  <p>No workouts added yet</p>
                ) : (
                  formData.workouts.map((workout, index) => (
                    <div
                      key={index}
                      className=" p-4 rounded-md flex items-center"
                    >
                      <h2 className="w-[25%]">Workout {index + 1} : </h2>
                      <div
                        key={index}
                        className="border p-4 rounded-md flex w-full justify-between bg-[#FCFCFC]"
                      >
                        <h3>{workout.name}</h3>
                        {/* <div
                          onClick={() => setIsModalOpen(true)}
                          className="flex items-center gap-2 bg-[#FCFCFC]"
                        > */}
                        <Link
                          className="flex items-center gap-2 "
                          to={`/editWorkoutPlan/${id}/plan/${workout._id}`}
                        >
                          <span>
                            <svg
                              width="18"
                              height="19"
                              viewBox="0 0 18 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 18.2083V13.9583L13.2 0.783252C13.4 0.599919 13.621 0.458252 13.863 0.358252C14.105 0.258252 14.359 0.208252 14.625 0.208252C14.891 0.208252 15.1493 0.258252 15.4 0.358252C15.6507 0.458252 15.8673 0.608252 16.05 0.808252L17.425 2.20825C17.625 2.39159 17.771 2.60825 17.863 2.85825C17.955 3.10825 18.0007 3.35825 18 3.60825C18 3.87492 17.9543 4.12925 17.863 4.37125C17.7717 4.61325 17.6257 4.83392 17.425 5.03325L4.25 18.2083H0ZM14.6 5.00825L16 3.60825L14.6 2.20825L13.2 3.60825L14.6 5.00825Z"
                                fill="#007AFF"
                              />
                            </svg>
                          </span>
                          <span className="text-[#007AFF]">Edit</span>
                        </Link>

                        {/* </div> */}
                      </div>
                      <div className="ml-4 cursor-pointer">
                        <svg
                          width="29"
                          height="56"
                          viewBox="0 0 29 56"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            y="0.708252"
                            width="29"
                            height="55"
                            rx="4"
                            fill="#E9E9E9"
                          />
                          <path
                            d="M18 33.7083C18.197 33.7083 18.392 33.7471 18.574 33.8224C18.756 33.8978 18.9214 34.0083 19.0607 34.1476C19.1999 34.2869 19.3104 34.4522 19.3858 34.6342C19.4612 34.8162 19.5 35.0113 19.5 35.2083C19.5 35.4052 19.4612 35.6003 19.3858 35.7823C19.3104 35.9643 19.1999 36.1296 19.0607 36.2689C18.9214 36.4082 18.756 36.5187 18.574 36.5941C18.392 36.6695 18.197 36.7083 18 36.7083C17.6022 36.7083 17.2206 36.5502 16.9393 36.2689C16.658 35.9876 16.5 35.6061 16.5 35.2083C16.5 34.8104 16.658 34.4289 16.9393 34.1476C17.2206 33.8663 17.6022 33.7083 18 33.7083ZM11 33.7083C11.197 33.7083 11.392 33.7471 11.574 33.8224C11.756 33.8978 11.9214 34.0083 12.0607 34.1476C12.1999 34.2869 12.3104 34.4522 12.3858 34.6342C12.4612 34.8162 12.5 35.0113 12.5 35.2083C12.5 35.4052 12.4612 35.6003 12.3858 35.7823C12.3104 35.9643 12.1999 36.1296 12.0607 36.2689C11.9214 36.4082 11.756 36.5187 11.574 36.5941C11.392 36.6695 11.197 36.7083 11 36.7083C10.6022 36.7083 10.2206 36.5502 9.93934 36.2689C9.65804 35.9876 9.5 35.6061 9.5 35.2083C9.5 34.8104 9.65804 34.4289 9.93934 34.1476C10.2206 33.8663 10.6022 33.7083 11 33.7083ZM18 26.7083C18.197 26.7083 18.392 26.7471 18.574 26.8224C18.756 26.8978 18.9214 27.0083 19.0607 27.1476C19.1999 27.2869 19.3104 27.4522 19.3858 27.6342C19.4612 27.8162 19.5 28.0113 19.5 28.2083C19.5 28.4052 19.4612 28.6003 19.3858 28.7823C19.3104 28.9643 19.1999 29.1296 19.0607 29.2689C18.9214 29.4082 18.756 29.5187 18.574 29.5941C18.392 29.6695 18.197 29.7083 18 29.7083C17.6022 29.7083 17.2206 29.5502 16.9393 29.2689C16.658 28.9876 16.5 28.6061 16.5 28.2083C16.5 27.8104 16.658 27.4289 16.9393 27.1476C17.2206 26.8663 17.6022 26.7083 18 26.7083ZM11 26.7083C11.197 26.7083 11.392 26.7471 11.574 26.8224C11.756 26.8978 11.9214 27.0083 12.0607 27.1476C12.1999 27.2869 12.3104 27.4522 12.3858 27.6342C12.4612 27.8162 12.5 28.0113 12.5 28.2083C12.5 28.4052 12.4612 28.6003 12.3858 28.7823C12.3104 28.9643 12.1999 29.1296 12.0607 29.2689C11.9214 29.4082 11.756 29.5187 11.574 29.5941C11.392 29.6695 11.197 29.7083 11 29.7083C10.6022 29.7083 10.2206 29.5502 9.93934 29.2689C9.65804 28.9876 9.5 28.6061 9.5 28.2083C9.5 27.8104 9.65804 27.4289 9.93934 27.1476C10.2206 26.8663 10.6022 26.7083 11 26.7083ZM18 19.7083C18.3978 19.7083 18.7794 19.8663 19.0607 20.1476C19.342 20.4289 19.5 20.8104 19.5 21.2083C19.5 21.6061 19.342 21.9876 19.0607 22.2689C18.7794 22.5502 18.3978 22.7083 18 22.7083C17.6022 22.7083 17.2206 22.5502 16.9393 22.2689C16.658 21.9876 16.5 21.6061 16.5 21.2083C16.5 20.8104 16.658 20.4289 16.9393 20.1476C17.2206 19.8663 17.6022 19.7083 18 19.7083ZM11 19.7083C11.3978 19.7083 11.7794 19.8663 12.0607 20.1476C12.342 20.4289 12.5 20.8104 12.5 21.2083C12.5 21.6061 12.342 21.9876 12.0607 22.2689C11.7794 22.5502 11.3978 22.7083 11 22.7083C10.6022 22.7083 10.2206 22.5502 9.93934 22.2689C9.65804 21.9876 9.5 21.6061 9.5 21.2083C9.5 20.8104 9.65804 20.4289 9.93934 20.1476C10.2206 19.8663 10.6022 19.7083 11 19.7083Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="w-[50%] max-md:w-full">
                {workouts?.length === 0 ? (
                  <p>No workouts added yet</p>
                ) : (
                  workouts.map((workout, index) => (
                    <div
                      key={index}
                      className=" p-4 rounded-md flex items-center"
                    >
                      <h2 className="w-[25%] max-md:w-[50%]">
                        Workout : {index + 1}
                      </h2>
                      <div
                        key={index}
                        className="border p-4 rounded-md flex w-full justify-between"
                      >
                        <h3>{workout.name}</h3>
                        <div className="flex items-center gap-2 bg-[#FCFCFC]">
                          <span>
                            <svg
                              width="18"
                              height="19"
                              viewBox="0 0 18 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 18.2083V13.9583L13.2 0.783252C13.4 0.599919 13.621 0.458252 13.863 0.358252C14.105 0.258252 14.359 0.208252 14.625 0.208252C14.891 0.208252 15.1493 0.258252 15.4 0.358252C15.6507 0.458252 15.8673 0.608252 16.05 0.808252L17.425 2.20825C17.625 2.39159 17.771 2.60825 17.863 2.85825C17.955 3.10825 18.0007 3.35825 18 3.60825C18 3.87492 17.9543 4.12925 17.863 4.37125C17.7717 4.61325 17.6257 4.83392 17.425 5.03325L4.25 18.2083H0ZM14.6 5.00825L16 3.60825L14.6 2.20825L13.2 3.60825L14.6 5.00825Z"
                                fill="#007AFF"
                              />
                            </svg>
                          </span>
                          <span className="text-[#007AFF]">Edit</span>
                        </div>
                      </div>
                      <div className="ml-4 cursor-pointer">
                        <svg
                          width="29"
                          height="56"
                          viewBox="0 0 29 56"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            y="0.708252"
                            width="29"
                            height="55"
                            rx="4"
                            fill="#E9E9E9"
                          />
                          <path
                            d="M18 33.7083C18.197 33.7083 18.392 33.7471 18.574 33.8224C18.756 33.8978 18.9214 34.0083 19.0607 34.1476C19.1999 34.2869 19.3104 34.4522 19.3858 34.6342C19.4612 34.8162 19.5 35.0113 19.5 35.2083C19.5 35.4052 19.4612 35.6003 19.3858 35.7823C19.3104 35.9643 19.1999 36.1296 19.0607 36.2689C18.9214 36.4082 18.756 36.5187 18.574 36.5941C18.392 36.6695 18.197 36.7083 18 36.7083C17.6022 36.7083 17.2206 36.5502 16.9393 36.2689C16.658 35.9876 16.5 35.6061 16.5 35.2083C16.5 34.8104 16.658 34.4289 16.9393 34.1476C17.2206 33.8663 17.6022 33.7083 18 33.7083ZM11 33.7083C11.197 33.7083 11.392 33.7471 11.574 33.8224C11.756 33.8978 11.9214 34.0083 12.0607 34.1476C12.1999 34.2869 12.3104 34.4522 12.3858 34.6342C12.4612 34.8162 12.5 35.0113 12.5 35.2083C12.5 35.4052 12.4612 35.6003 12.3858 35.7823C12.3104 35.9643 12.1999 36.1296 12.0607 36.2689C11.9214 36.4082 11.756 36.5187 11.574 36.5941C11.392 36.6695 11.197 36.7083 11 36.7083C10.6022 36.7083 10.2206 36.5502 9.93934 36.2689C9.65804 35.9876 9.5 35.6061 9.5 35.2083C9.5 34.8104 9.65804 34.4289 9.93934 34.1476C10.2206 33.8663 10.6022 33.7083 11 33.7083ZM18 26.7083C18.197 26.7083 18.392 26.7471 18.574 26.8224C18.756 26.8978 18.9214 27.0083 19.0607 27.1476C19.1999 27.2869 19.3104 27.4522 19.3858 27.6342C19.4612 27.8162 19.5 28.0113 19.5 28.2083C19.5 28.4052 19.4612 28.6003 19.3858 28.7823C19.3104 28.9643 19.1999 29.1296 19.0607 29.2689C18.9214 29.4082 18.756 29.5187 18.574 29.5941C18.392 29.6695 18.197 29.7083 18 29.7083C17.6022 29.7083 17.2206 29.5502 16.9393 29.2689C16.658 28.9876 16.5 28.6061 16.5 28.2083C16.5 27.8104 16.658 27.4289 16.9393 27.1476C17.2206 26.8663 17.6022 26.7083 18 26.7083ZM11 26.7083C11.197 26.7083 11.392 26.7471 11.574 26.8224C11.756 26.8978 11.9214 27.0083 12.0607 27.1476C12.1999 27.2869 12.3104 27.4522 12.3858 27.6342C12.4612 27.8162 12.5 28.0113 12.5 28.2083C12.5 28.4052 12.4612 28.6003 12.3858 28.7823C12.3104 28.9643 12.1999 29.1296 12.0607 29.2689C11.9214 29.4082 11.756 29.5187 11.574 29.5941C11.392 29.6695 11.197 29.7083 11 29.7083C10.6022 29.7083 10.2206 29.5502 9.93934 29.2689C9.65804 28.9876 9.5 28.6061 9.5 28.2083C9.5 27.8104 9.65804 27.4289 9.93934 27.1476C10.2206 26.8663 10.6022 26.7083 11 26.7083ZM18 19.7083C18.3978 19.7083 18.7794 19.8663 19.0607 20.1476C19.342 20.4289 19.5 20.8104 19.5 21.2083C19.5 21.6061 19.342 21.9876 19.0607 22.2689C18.7794 22.5502 18.3978 22.7083 18 22.7083C17.6022 22.7083 17.2206 22.5502 16.9393 22.2689C16.658 21.9876 16.5 21.6061 16.5 21.2083C16.5 20.8104 16.658 20.4289 16.9393 20.1476C17.2206 19.8663 17.6022 19.7083 18 19.7083ZM11 19.7083C11.3978 19.7083 11.7794 19.8663 12.0607 20.1476C12.342 20.4289 12.5 20.8104 12.5 21.2083C12.5 21.6061 12.342 21.9876 12.0607 22.2689C11.7794 22.5502 11.3978 22.7083 11 22.7083C10.6022 22.7083 10.2206 22.5502 9.93934 22.2689C9.65804 21.9876 9.5 21.6061 9.5 21.2083C9.5 20.8104 9.65804 20.4289 9.93934 20.1476C10.2206 19.8663 10.6022 19.7083 11 19.7083Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-[1000px] mx-auto overflow-auto">
            <AddWorkoutToPlan
              onClose={() => setIsModalOpen(false)}
              onAddWorkout={handleAddWorkout}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePlan;
