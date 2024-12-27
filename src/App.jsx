import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddWorkoutForm from "./pages/AddWorkoutForm";
import Navbar from "./components/Navbar";
import Plan from "./pages/Plan";
import CreatePlan from "./pages/CreatePlan";
import EditPlan from "./pages/EditPlan";
import AddWorkoutToPlan from "./pages/AddWorkoutToPlan";

const user = localStorage.getItem("token");
console.log(user);
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {!user ? "" : <Navbar />}
        <Routes>
          <Route exact path="/" element={!user ? <Login /> : <Dashboard />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/AddWorkoutForm" element={<AddWorkoutForm />} />
          <Route exact path="/plan" element={<Plan />} />
          <Route exact path="/CreatePlan" element={<CreatePlan />} />
          <Route exact path="/EditPlan" element={<EditPlan />} />
          <Route
            exact
            path="/AddWorkoutForm/:id"
            element={<AddWorkoutForm />}
          />
          <Route exact path="/EditPlan/:id" element={<CreatePlan />} />
          <Route
            exact
            path="/editWorkoutPlan/:id/plan/:planId"
            element={<AddWorkoutToPlan />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
