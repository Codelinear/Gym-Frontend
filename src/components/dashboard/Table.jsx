import axios from "axios";
// import Link from "next/link";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Table() {
  // const data = Array(15).fill({
  //   id: "01",
  //   workoutName: "Face pull",
  //   workoutType: "Traps",
  //   equipment: "Cable machine",
  //   reps: 12,
  //   sets: 3,
  // });
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // const res = await axios.get("http://localhost:8000/api/workout");
      const res = await axios.get(
        "https://gym-backend-4kei.onrender.com/api/workout"
      );
      console.log(res.data);
      console.log(res);
      setData(res.data);
    }
    fetchData();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // If the query is empty, show all data; otherwise, filter
    const filtered = query
      ? data?.filter((item) => item.name?.toLowerCase().includes(query))
      : data;

    setFilteredData(filtered);
  };
  return (
    <>
      <div className="flex items-center justify-between mt-10 p-4 bg-[#fff] max-w-[1285px] mx-auto max-md:flex-wrap max-md:gap-10 max-md:justify-center">
        <select className="p-4  bg-white border rounded shadow-sm focus:outline-none">
          <option>Filter by workout type</option>
          <option>Traps</option>
          <option>Legs</option>
          <option>Chest</option>
        </select>
        <div className="flex items-center space-x-2 max-md:flex-wrap max-md:gap-5 max-md:justify-center">
          <div className="flex items-center relative">
            <span className="absolute left-2" role="img" aria-label="filter">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.6804 16.654L9.41842 10.392C8.91842 10.818 8.34342 11.1477 7.69342 11.381C7.04342 11.6143 6.39008 11.731 5.73342 11.731C4.13208 11.731 2.77675 11.1767 1.66742 10.068C0.558085 8.95935 0.00341797 7.60435 0.00341797 6.00302C0.00341797 4.40168 0.557418 3.04601 1.66542 1.93601C2.77342 0.826015 4.12809 0.270348 5.72942 0.269015C7.33075 0.267682 8.68675 0.822348 9.79742 1.93301C10.9081 3.04368 11.4634 4.39935 11.4634 6.00001C11.4634 6.69468 11.3404 7.36701 11.0944 8.01701C10.8484 8.66702 10.5251 9.22302 10.1244 9.68502L16.3864 15.946L15.6804 16.654ZM5.73442 10.73C7.06108 10.73 8.18108 10.2733 9.09442 9.36001C10.0078 8.44668 10.4644 7.32635 10.4644 5.99901C10.4644 4.67168 10.0078 3.55168 9.09442 2.63901C8.18108 1.72635 7.06108 1.26968 5.73442 1.26901C4.40775 1.26835 3.28742 1.72501 2.37342 2.63901C1.45942 3.55301 1.00275 4.67301 1.00342 5.99901C1.00408 7.32501 1.46075 8.44502 2.37342 9.35902C3.28608 10.273 4.40608 10.7297 5.73342 10.729"
                  fill="black"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search Workouts"
              // value={searchQuery}
              // onChange={handleSearch}
              className="ml4 p-4 border rounded w-[350px] max-md:w-full pl-10"
            />
          </div>
          <Link to={"/AddWorkoutForm"}>
            <button className="px-8 p-4 text-white bg-[#007AFF] rounded-md hover:bg-blue-700">
              Add Workout
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto w-full px10 py-10 max-w-[1285px] mx-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md max-w-[1285px] mx-auto">
          <thead className="bg-white">
            <tr className="text-[14px]">
              <th className="p-2 text-left border-r">S.No.</th>
              <th className="p-2 text-left border-r w-[300px]">Workout Name</th>
              <th className="p-2 text-left border-r">Workout Type</th>
              <th className="p-2 text-left border-r w-[300px]">Equipment</th>
              <th className="p-2 text-left border-r">Reps</th>
              <th className="p-2 text-left border-r">Sets</th>
              <th className="p-2 text-left border-r"></th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              [...data].reverse().map((item, index) => (
                <tr key={index} className="border-t text-[14px]">
                  <td className="p-2 border-r">{index + 1}</td>
                  <td className="p-2 border-r">{item.name}</td>
                  <td className="p-2 border-r">{item.type}</td>
                  <td className="p-2 border-r">{item.equipment}</td>
                  <td className="p-2 border-r">{item.reps}</td>
                  <td className="p-2 border-r">{item.sets}</td>
                  <td className="p-2 flex items-end justify-center cursor-pointer">
                    <Link to={`/AddWorkoutForm/${item._id}`}>
                      <button className="px-3 py-1 text-sm text-[#007AFF] border border-[#007AFF] rounded-md hover:bg-[#007AFF] hover:text-white">
                        Edit Workout
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <p className="text-gray-600">
                No Workout found matching the search.
              </p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
