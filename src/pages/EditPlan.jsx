// import Link from "next/link";

import { Link } from "react-router-dom";

export default function EditPlan() {
  return (
    <div className="py-6 rounded-lg max-w-[1285px] mx-auto">
      <header className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center p-4 bg-white">
          <Link to="/dashboard" className="cursor-pointer">
            <div className="text-blue-600 hover:underline">Go Back</div>
          </Link>
        </div>
        <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Save changes
        </button>
      </header>
      <h1 className="text-2xl my-5 font-bold">Edit Workout</h1>

      {/* Workout Information Section */}
      <section className="mb-8 relative">
        <div className="p-6 bg-white ">
          <h2 className="mb-4 text-lg font-semibold  top-10">
            Workout Information
          </h2>
          <div className="grid grid-cols-2 gap-6  shadow-sm p-6 bg-white ">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Workout name
              </label>
              <input
                type="text"
                className="w-full p-4 border rounded-md"
                defaultValue="Face pull"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Workout type
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                defaultValue="Traps"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Equipment
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                defaultValue="Face pull"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Reps
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  defaultValue="12"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Sets
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  defaultValue="3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workout Tutorial Section */}
      <section className="bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Workout Tutorial</h2>
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Video link
          </label>
          <input
            type="url"
            className="w-full p-2 border rounded-md"
            placeholder="Click to paste video link"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Workout description
          </label>
          <textarea
            rows="6"
            className="w-full p-2 border rounded-md"
            placeholder="Write about how to perform this workout"
          ></textarea>
        </div>
      </section>

      <button className="px-4 mt-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Save changes
      </button>
    </div>
  );
}
