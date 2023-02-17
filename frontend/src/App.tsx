import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { DashboardProvider } from "./context/Dashboard.context";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <DashboardProvider>
              <Dashboard />
            </DashboardProvider>
          }
        />
      </Routes>
    </Router>
  );
}
