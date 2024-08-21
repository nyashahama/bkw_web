import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import ClientDashboard from "./pages/dashboard/client/ClientDashboard";
import VendorDashboard from "./pages/dashboard/vendor/VendorDashboard";
import Signup from "./pages/general/signup.jsx";
import Login from "./pages/general/Login.jsx";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/default" element={<ClientDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
