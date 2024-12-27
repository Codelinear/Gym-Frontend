// import Link from "next/link";

import { Link } from "react-router-dom";

export default function Filter() {
  return (
    <div className="flex items-center justify-between mt-10 p-4 bg-[#fff] max-w-[1285px] mx-auto">
      <select className="p-2 bg-white border rounded shadow-sm focus:outline-none">
        <option>Filter by workout type</option>
        <option>Traps</option>
        <option>Legs</option>
        <option>Chest</option>
      </select>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search workouts"
          className="p-2 bg-white border rounded-md shadow-sm focus:outline-none"
        />
        <Link to={"/AddWorkoutForm"}>
          <button className="px-8 py-2 text-white bg-[#007AFF] rounded-md hover:bg-blue-700">
            Add Workout
          </button>
        </Link>
      </div>
    </div>
  );
}
