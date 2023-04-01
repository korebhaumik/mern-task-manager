import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { DashboardProvider } from "./context/Dashboard.context";
import { LoginProvider } from "./context/Login.context";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginProvider>
                <Login />
              </LoginProvider>
            }
          />
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
    </QueryClientProvider>
  );
}
