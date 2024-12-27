// // import Link from "next/link";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const PlanCard1 = () => {
//   return (
//     <div className=" rounded-lg p-4 shadow-sm bg-white">
//       <h2 className="text-lg font-semibold mb-2">Lats and back</h2>
//       <ul className="text-sm text-gray-600 space-y-1">
//         <li>
//           <span role="img" aria-label="flame">
//             🔥
//           </span>{" "}
//           350 KCal
//         </li>
//         <li>
//           <span role="img" aria-label="clock">
//             ⏱️
//           </span>{" "}
//           40 mins
//         </li>
//         <li>Easy</li>
//         <li>Total workout: 6</li>
//         <li>Workout type: Lats and back</li>
//       </ul>
//       <Link to={"/EditPlan"}>
//         <button className="mt-4 px-4 py-2 border rounded text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
//           Edit Plan
//         </button>
//       </Link>
//     </div>
//   );
// };

// const PlanCard = () => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     async function fetchData() {
//       const res = await axios.get("http://localhost:8000/api/plan");
//       console.log(res.data);
//       console.log(res);
//       setData(res.data);
//     }

//     fetchData();
//   }, []);
//   return (
//     <>
//       <div className="bg-gray-100 min-h-screen p-8 max-w-[1285px] mx-auto">
//         <header className="flex justify-between items-center mb-8">
//           <div className="flex items-center">
//             <span role="img" aria-label="filter">
//               🔍
//             </span>
//             <input
//               type="text"
//               placeholder="Search Plan"
//               className="ml-4 p-2 border rounded w-64"
//             />
//           </div>
//           <Link to={"/CreatePlan"}>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded shadow">
//               Create Plan
//             </button>
//           </Link>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {/* {Array.from({ length: 12 }).map((_, index) => (
//             <PlanCard1 key={index} />
//           ))} */}
//           {data.map((items, index) => (
//             <div key={index} className=" rounded-lg p-4 shadow-sm bg-white">
//               <h2 className="text-lg font-semibold mb-2">{items.name}</h2>
//               <ul className="text-sm text-gray-600 space-y-1">
//                 <li>
//                   <span role="img" aria-label="flame">
//                     🔥
//                   </span>
//                   {items.calories}KCal
//                 </li>
//                 <li>
//                   <span role="img" aria-label="clock">
//                     ⏱️
//                   </span>
//                   {items.duration}
//                   mins
//                 </li>
//                 <li> {items.difficulty}</li>
//                 {/* <li>Total workout: {items.workouts?.length}</li> */}
//                 <li>Total workouts: {items.workouts.length}</li>

//                 <li>Workout type: {items.workouts?.type}</li>
//               </ul>

//               <Link to={`/EditPlan/${items._id}`}>
//                 <button className="mt-4 px-4 py-2 border rounded text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
//                   Edit Plan
//                 </button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PlanCard;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlanCard = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://gym-backend-4kei.onrender.com/api/plan"
          // "http://localhost:8000/api/plan"
          // https://www.youtube.com/watch?v=v5qKtDtIBCU&themeRefresh=1
        );
        setData(res.data);
        console.log(res.data);
        setFilteredData(res.data); // Initialize filteredData with all data
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter data based on the search query
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-0 mt-2 py-8 max-w-[1285px] mx-auto">
      <header className="flex justify-between items-center mb-8 bg-[#fff] p-4 rounded-lg max-md:flex-wrap max-md:gap-4 max-md:justify-center">
        <div className="flex items-center gap-2">
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 1.5H4C2.586 1.5 1.879 1.5 1.44 1.912C1 2.324 1 2.988 1 4.315V5.005C1 6.042 1 6.561 1.26 6.991C1.52 7.421 1.993 7.689 2.942 8.223L5.855 9.863C6.491 10.221 6.81 10.4 7.038 10.598C7.512 11.009 7.804 11.493 7.936 12.088C8 12.372 8 12.706 8 13.373V16.043C8 16.952 8 17.407 8.252 17.761C8.504 18.116 8.952 18.291 9.846 18.641C11.725 19.375 12.664 19.742 13.332 19.324C14 18.907 14 17.952 14 16.042V13.372C14 12.706 14 12.372 14.064 12.087C14.1896 11.5042 14.5059 10.9798 14.963 10.597C15.19 10.4 15.509 10.221 16.145 9.862L19.058 8.222C20.006 7.689 20.481 7.422 20.74 6.992C21 6.562 21 6.042 21 5.004V4.314C21 2.988 21 2.324 20.56 1.912C20.122 1.5 19.415 1.5 18 1.5Z"
              stroke="black"
              stroke-width="1.5"
            />
          </svg>
          Filter By
        </div>

        <div className="flex items-center gap-2 max-md:flex-wrap max-md:gap-4 max-md:justify-center">
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
              placeholder="Search Plan"
              value={searchQuery}
              onChange={handleSearch}
              className="ml4 p-4 border rounded w-64 pl-10"
            />
          </div>
          <Link to={"/CreatePlan"}>
            <button className="px-8 py-4 bg-blue-600 text-white rounded shadow">
              Create Plan
            </button>
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredData.length > 0 ? (
          [...filteredData].reverse().map((item, index) => (
            <div
              key={index}
              className="rounded-lg p-4 shadow-sm bg-white max-md:text-center"
            >
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <ul className="text-sm text-gray-600 space-y-1 flex max-md:flex-wrap gap-5 justify-start items-center max-md:justify-center ">
                <li className="flex gap-1">
                  <span role="img" aria-label="flame">
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5735 8.92987C12.5735 12.6441 9.78781 14.5013 7.00209 14.5013C4.21637 14.5013 1.43066 12.6441 1.43066 8.92987C1.43066 6.14415 2.82352 4.7513 3.75209 4.28701C3.75209 5.67987 4.21638 6.60844 4.68066 7.07272C7.46638 6.14415 7.93066 3.35844 7.93066 1.5013C9.78781 2.89415 12.5735 5.21558 12.5735 8.92987Z"
                        stroke="black"
                        stroke-width="1.14286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>{" "}
                  {item.calories} kCal
                </li>
                <li className="flex gap-1">
                  <span role="img" aria-label="clock">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.00001 14.898C11.8097 14.898 14.898 11.8097 14.898 7.99999C14.898 4.19036 11.8097 1.10204 8.00001 1.10204C4.19037 1.10204 1.10205 4.19036 1.10205 7.99999C1.10205 11.8097 4.19037 14.898 8.00001 14.898Z"
                        stroke="black"
                        stroke-width="1.14286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 5.34694V8L10.6955 11.1412"
                        stroke="black"
                        stroke-width="1.14286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  {item.duration} mins
                </li>
                <li>{item.difficulty}</li>
              </ul>
              <p className="text-sm text-gray-600">
                Total workouts: {item.workouts.length}
              </p>
              <p className="text-sm text-gray-600">
                Workout type: {item.workouts[0].type}
              </p>
              <Link to={`/EditPlan/${item._id}`}>
                <button className="mt-4 px-4 py-2 border rounded text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                  Edit Plan
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No plans found matching the search.</p>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
