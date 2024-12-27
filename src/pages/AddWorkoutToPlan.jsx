"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";

import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddWorkoutToPlan({ onAddWorkout, onClose }) {
  // const { _id } = router.query;
  //   const searchParams = useSearchParams(); // Hook to access query parameters
  const id = useParams();
  const planId = useParams();
  console.log(id);
  console.log(id.planId);
  // const { id } = router.query || {};
  // console.log(id);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    equipment: "",
    reps: "",
    sets: "",
    video: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    async function fetchWorkoutData() {
      if (id.id) {
        // to={`/editWorkoutPlan/${id}/plan/${workout._id}`}
        const res = await axios.get(
          `https://gym-backend-4kei.onrender.com/api/plan/plans/${id.id}/workouts/${id.planId}`
        );
        setFormData({
          name: res.data.name,
          type: res.data.type,
          equipment: res.data.equipment,
          reps: res.data.reps,
          sets: res.data.sets,
          videoLink: res.data.videoLink || "",
          description: res.data.description || "",
        });
      }
    }
    fetchWorkoutData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, type, equipment, reps, sets, video, description } = formData;

    const newWorkout = {
      name,
      type,
      equipment,
      reps,
      sets,
      video,
      description,
    };
    if (id.planId) {
      const response = await axios.put(
        `https://gym-backend-4kei.onrender.com/api/plan/plans/${id.id}/workouts/${id.planId}`,
        newWorkout
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
      onAddWorkout(newWorkout);
      onClose();
    }
    // Close the modal after adding the workout
  };

  return (
    <div className="py-6 rounded-lg max-w-[1285px] mx-auto">
      <header className="flex items-center justify-between p- bg-white">
        <div className="flex items-center p-4 bg-white">
          <Link to="/plan" className="cursor-pointer">
            <div className="text-blue-600 hover:underline flex items-center">
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
            </div>
          </Link>
        </div>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {id.id ? "Update Workout" : "Save Changes"}
        </button>
      </header>
      <h1 className="text-2xl my-5 font-bold">
        <span className="opacity-50 font-">Create Plan {">"} </span>

        {id.id ? "  Edit Workout" : "  Add Workout"}
      </h1>

      {/* Workout Information Section */}
      <section className="mb-8 relative">
        <div className="p- bg-white ">
          <h2 className="mb-4 text-lg font-semibold top-10">
            Workout Information
          </h2>
          <div className="grid grid-cols-2 gap-6 shadow-sm p-6 bg-white">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Workout name
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border rounded-md"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Workout type
              </label>
              <input
                type="text"
                name="type"
                className="w-full p-2 border rounded-md"
                placeholder="Face pull"
                value={formData.type}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                equipment
              </label>
              <input
                type="text"
                name="equipment"
                className="w-full p-2 border rounded-md"
                value={formData.equipment}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Reps
                </label>
                <input
                  type="number"
                  name="reps"
                  className="w-full p-2 border rounded-md"
                  value={formData.reps}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Sets
                </label>
                <input
                  type="number"
                  name="sets"
                  className="w-full p-2 border rounded-md"
                  value={formData.sets}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workout Tutorial Section */}
      <section className="bg-white p-">
        <h2 className="mb-4 text-lg font-semibold">Workout Tutorial</h2>
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Video link
          </label>
          <input
            type="text"
            name="video"
            className="w-full p-2 border rounded-md"
            placeholder="Click to paste video link"
            value={formData.video}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Workout description
          </label>
          <textarea
            name="description"
            rows="6"
            className="w-full p-2 border rounded-md"
            placeholder="Write about how to perform this workout"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </section>

      <button
        onClick={handleSubmit}
        className="px-4 mt-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        {isLoading ? "Saving..." : id.id ? "Update Workout" : "Save Changes"}
      </button>
    </div>
  );
}
// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function AddWorkoutForm() {
//   const [formData, setFormData] = useState({
//     name: "Face pull",
//     type: "Traps",
//     equipment: "Face pull",
//     reps: 12,
//     sets: 3,
//     video: "",
//     description: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     const { name, type, equipment, reps, sets, video, description } = formData;

//     // Validate the input fields
//     if (!name || !type || !equipment || !reps || !sets) {
//       alert("Please fill in all the required fields.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8000/api/workout", {
//         name,
//         type,
//         equipment,
//         reps,
//         sets,
//         video,
//         description,
//       });
//       // if (response.status === 200) {
//       //   alert("Workout added successfully!");
//       // }

//       if (response.status === 201) {
//         toast.success(response.data.message, {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//         // Wait for the toast duration (3000ms)
//       }
//     } catch (error) {
//       // console.error("Error submitting workout data:", error);
//       // alert("Failed to save the workout. Please try again.");
//       console.log(error.response.data.message);
//       toast.error(error.response.data.message, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   };

//   return (
//     <div className="py-6 rounded-lg max-w-[1285px] mx-auto">
//       <header className="flex items-center justify-between p-4 bg-white">
//         <div className="flex items-center p-4 bg-white">
//           <Link href="/dashboard" className="cursor-pointer">
//             <div className="text-blue-600 hover:underline">Go Back</div>
//           </Link>
//         </div>
//         <button
//           onClick={handleSubmit}
//           className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
//         >
//           Save changes
//         </button>
//       </header>
//       <h1 className="text-2xl my-5 font-bold">Add Workout</h1>

//       {/* Workout Information Section */}
//       <section className="mb-8 relative">
//         <div className="p-6 bg-white ">
//           <h2 className="mb-4 text-lg font-semibold top-10">
//             Workout Information
//           </h2>
//           <div className="grid grid-cols-2 gap-6 shadow-sm p-6 bg-white">
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-600">
//                 Workout name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 className="w-full p-4 border rounded-md"
//                 value={formData.name}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-600">
//                 Workout type
//               </label>
//               <input
//                 type="text"
//                 name="type"
//                 className="w-full p-2 border rounded-md"
//                 value={formData.type}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-600">
//                 equipment
//               </label>
//               <input
//                 type="text"
//                 name="equipment"
//                 className="w-full p-2 border rounded-md"
//                 value={formData.equipment}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-1 text-sm font-medium text-gray-600">
//                   Reps
//                 </label>
//                 <input
//                   type="number"
//                   name="reps"
//                   className="w-full p-2 border rounded-md"
//                   value={formData.reps}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-medium text-gray-600">
//                   Sets
//                 </label>
//                 <input
//                   type="number"
//                   name="sets"
//                   className="w-full p-2 border rounded-md"
//                   value={formData.sets}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Workout Tutorial Section */}
//       <section className="bg-white p-6">
//         <h2 className="mb-4 text-lg font-semibold">Workout Tutorial</h2>
//         <div className="mb-6">
//           <label className="block mb-1 text-sm font-medium text-gray-600">
//             Video link
//           </label>
//           <input
//             type="url"
//             name="video"
//             className="w-full p-2 border rounded-md"
//             placeholder="Click to paste video link"
//             value={formData.video}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label className="block mb-1 text-sm font-medium text-gray-600">
//             Workout description
//           </label>
//           <textarea
//             name="description"
//             rows="6"
//             className="w-full p-2 border rounded-md"
//             placeholder="Write about how to perform this workout"
//             value={formData.description}
//             onChange={handleInputChange}
//           ></textarea>
//         </div>
//       </section>

//       <button
//         onClick={handleSubmit}
//         className="px-4 mt-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
//       >
//         Save changes
//       </button>
//     </div>
//   );
// }
